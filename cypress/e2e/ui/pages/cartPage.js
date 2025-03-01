import { CartPageLocators } from '../../../support/locators';

/**
 * Page object for the Cart page.
 */
class CartPage {
    /**
     * Retrieves the details (name and price) of each item in the cart.
     * @returns {Cypress.Chainable<Array<{name: string, price: number}>>} - A Cypress chainable containing an array of item details.
     */
    getCartItemDetails() {
        return cy.getCartItemDetails();
    }

    /**
     * Navigates to the checkout page.
     */
    goToCheckout() {
        cy.get(CartPageLocators.checkoutButton).click();
    }
}

export default new CartPage();