/**
 * Page object for the Checkout Overview page.
 */
class OverviewPage {

    /**
     * Verifies the summary information displayed on the page, including item details.
     * @param {Array<{name: string, price: number}>} cartItemDetails - An array of cart item details captured before checkout.
     */
    static verifySummaryInformation(cartItemDetails) {
        cy.verifySummaryInformation(cartItemDetails); // Calls the custom command to verify the information
    }

    /**
     * Clicks the "Finish" button to complete the checkout process.
     */
    static finishCheckout() {
        cy.get('[data-test="finish"]').click();
    }
}

export default OverviewPage;