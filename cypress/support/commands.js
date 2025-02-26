/**
 * Logs in the user with the given username and password.
 * @param {string} username - The username to use for login.
 * @param {string} password - The password to use for login.
 */
Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
  cy.url().should('include', '/inventory.html');
});

/**
* Adds the specified items to the cart.
* @param {string[]} itemNames - An array of item names to add to the cart.
*/
Cypress.Commands.add('addItemsToCart', (itemNames) => {
  itemNames.forEach(itemName => {
    cy.get('[data-test="inventory-item"]').each(($item) => {
      cy.wrap($item).find('[data-test="inventory-item-name"]').then(($name) => {
        const currentItemName = $name.text();
        if (currentItemName.includes(itemName)) {
          cy.wrap($item).find('[data-test^="add-to-cart"]').click();
          return false; // Break the .each loop
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
  cy.get('.cart_item').each(($item) => {
    cy.wrap($item).find('[data-test="inventory-item-name"]').then(($name) => {
      const itemName = $name.text();
      cy.wrap($item).find('[data-test="inventory-item-price"]').then(($price) => {
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
  cy.get('[data-test="firstName"]').type(userData.firstName);
  cy.get('[data-test="lastName"]').type(userData.lastName);
  cy.get('[data-test="postalCode"]').type(userData.postalCode);
});

/**
 * Verifies the summary information on the checkout overview page.
 * @param {Array<{name: string, price: number}>} cartItemDetailsBeforeCheckout - The item details captured before checkout.
 */
Cypress.Commands.add('verifySummaryInformation', (cartItemDetailsBeforeCheckout) => {
  cy.get('.summary_info').should('be.visible');

  // Extract items from the overview page and compare with expected cart details
  cy.get('.cart_list .cart_item').then(($cartItems) => {
    const overviewItemDetails = [];

    cy.wrap($cartItems).each(($item) => {
      cy.wrap($item).find('[data-test="inventory-item-name"]').invoke('text').then((name) => {
        cy.wrap($item).find('[data-test="inventory-item-price"]').invoke('text').then((priceStr) => {
          const itemPrice = parseFloat(priceStr.replace('$', ''));
          overviewItemDetails.push({ name, price: itemPrice });

          if (overviewItemDetails.length === cartItemDetailsBeforeCheckout.length) {
            expect(overviewItemDetails).to.deep.equal(cartItemDetailsBeforeCheckout);
          }
        });
      });
    });
  });

  // Extract and log price details
  const extractPrice = (selector, label) => {
    cy.get(selector).invoke('text').then((text) => {
      const price = parseFloat(text.replace(/[^0-9.]/g, ''));
      cy.log(`${label}: ${price}`);
    });
  };

  extractPrice('[data-test="subtotal-label"]', 'Subtotal');
  extractPrice('[data-test="tax-label"]', 'Tax');
  extractPrice('[data-test="total-label"]', 'Total');

  // Log additional info
  cy.get('[data-test="payment-info-value"]').invoke('text').then((text) => cy.log(`Payment Information: ${text}`));
  cy.get('[data-test="shipping-info-value"]').invoke('text').then((text) => cy.log(`Shipping Information: ${text}`));
});
