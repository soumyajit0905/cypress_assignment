/**
 * Page object for the Checkout page.
 */
class CheckoutPage {

    /**
     * Fills the checkout form with the provided user data.
     * @param {object} userData - An object containing the user's first name, last name, and postal code.
     */
    static fillForm(userData) {
        cy.fillCheckoutForm(userData); // Calls the custom command to fill the form
    }

    /**
     * Clicks the "Continue" button to proceed to the checkout overview page.
     */
    static continueToOverview() {
        cy.get('[data-test="continue"]').click();
    }
}

export default CheckoutPage;