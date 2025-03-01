import {
    LoginPageLocators,
    InventoryPageLocators,
    CartPageLocators,
    CheckoutPageLocators,
    OverviewPageLocators,
    CompletePageLocators,
} from './locators';

/**
 * Logs in the user with the given username and password.
 * @param {string} username - The username to use for login.
 * @param {string} password - The password to use for login.
 */
Cypress.Commands.add('login', (username, password) => {
    cy.get(LoginPageLocators.usernameField).type(username);
    cy.get(LoginPageLocators.passwordField).type(password);
    cy.get(LoginPageLocators.loginButton).click();
    cy.url().should('include', '/inventory.html');
});

/**
 * Adds the specified items to the cart.
 * @param {string[]} itemNames - An array of item names to add to the cart.
 */
Cypress.Commands.add('addItemsToCart', (itemNames) => {
    itemNames.forEach((itemName) => {
        cy.get(InventoryPageLocators.inventoryItem).each(($item) => {
            cy.wrap($item).find(InventoryPageLocators.inventoryItemName).then(($name) => {
                const currentItemName = $name.text();
                if (currentItemName.includes(itemName)) {
                    cy.wrap($item).find(InventoryPageLocators.addToCartButton).click();
                    return false;
                }
            });
        });
    });
});

/**
 * Retrieves the name and price of each item in the cart.
 * @returns {Cypress.Chainable<Array<{name: string, price: number}>>} - A Cypress chainable containing an array of item details.
 */
Cypress.Commands.add('getCartItemDetails', () => {
    const cartItemDetails = [];
    cy.get(CartPageLocators.cartItem).each(($item) => {
        cy.wrap($item).find(CartPageLocators.cartItemName).then(($name) => {
            const itemName = $name.text();
            cy.wrap($item).find(CartPageLocators.cartItemPrice).then(($price) => {
                const itemPriceStr = $price.text();
                const itemPrice = parseFloat(itemPriceStr.replace('$', ''));
                cartItemDetails.push({ name: itemName, price: itemPrice });
            });
        });
    });
    return cy.wrap(cartItemDetails);
});

/**
 * Fills the checkout form with the provided user data.
 * @param {object} userData - An object containing the user's first name, last name, and postal code.
 */
Cypress.Commands.add('fillCheckoutForm', (userData) => {
    cy.get(CheckoutPageLocators.firstNameField).type(userData.firstName);
    cy.get(CheckoutPageLocators.lastNameField).type(userData.lastName);
    cy.get(CheckoutPageLocators.postalCodeField).type(userData.postalCode);
});

/**
 * Verifies the summary information on the checkout overview page.
 * @param {Array<{name: string, price: number}>} cartItemDetailsBeforeCheckout - The item details captured before checkout.
 */
Cypress.Commands.add('verifySummaryInformation', (cartItemDetailsBeforeCheckout) => {
    cy.get(OverviewPageLocators.summaryInfo).should('be.visible');

    cy.get(OverviewPageLocators.cartItemList).then(($cartItems) => {
        const overviewItemDetails = [];

        cy.wrap($cartItems).each(($item) => {
            cy.wrap($item).find(CartPageLocators.cartItemName).invoke('text').then((name) => {
                cy.wrap($item).find(CartPageLocators.cartItemPrice).invoke('text').then((priceStr) => {
                    const itemPrice = parseFloat(priceStr.replace('$', ''));
                    overviewItemDetails.push({ name, price: itemPrice });

                    if (overviewItemDetails.length === cartItemDetailsBeforeCheckout.length) {
                        expect(overviewItemDetails).to.deep.equal(cartItemDetailsBeforeCheckout);
                    }
                });
            });
        });
    });

    const extractPrice = (selector, label) => {
        cy.get(selector).invoke('text').then((text) => {
            const price = parseFloat(text.replace(/[^0-9.]/g, ''));
            cy.log(`${label}: ${price}`);
        });
    };

    extractPrice(OverviewPageLocators.subtotalLabel, 'Subtotal');
    extractPrice(OverviewPageLocators.taxLabel, 'Tax');
    extractPrice(OverviewPageLocators.totalLabel, 'Total');

    cy.get(OverviewPageLocators.paymentInfoValue).invoke('text').then((text) => cy.log(`Payment Information: ${text}`));
    cy.get(OverviewPageLocators.shippingInfoValue).invoke('text').then((text) => cy.log(`Shipping Information: ${text}`));
});

/**
 * Waits for an element to be visible within a specified timeout.
 * @param {string} selector - The CSS selector for the element.
 * @param {number} timeout - The timeout in milliseconds (default: 5000).
 */
Cypress.Commands.add('waitForElementToBeVisible', (selector, timeout = 5000) => {
    return cy.get(selector, { timeout }).should('be.visible');
});