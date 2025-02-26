/**
 * Page object for the Cart page.
 */
class CartPage {
    /**
     * Retrieves the details (name and price) of each item in the cart.
     * @returns {Cypress.Chainable<Array<{name: string, price: number}>>} - A Cypress chainable containing an array of item details.
     */
    static getCartItemDetails() {
        return cy.getCartItemDetails(); // Call the custom command to get item details
    }

    /**
     * Navigates to the checkout page.
     */
    static goToCheckout() {
        cy.get('[data-test="checkout"]').click();
    }
}

export default CartPage;