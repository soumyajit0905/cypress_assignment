import { OverviewPageLocators } from '../../../support/locators';

/**
 * Page object for the Checkout Overview page.
 */
class OverviewPage {
    /**
     * Verifies the summary information displayed on the page, including item details.
     * @param {Array<{name: string, price: number}>} cartItemDetails - An array of cart item details captured before checkout.
     */
    verifySummaryInformation(cartItemDetails) {
        cy.verifySummaryInformation(cartItemDetails);
    }

    /**
     * Clicks the "Finish" button to complete the checkout process.
     */
    finishCheckout() {
        cy.get(OverviewPageLocators.finishButton).click();
    }
}

export default new OverviewPage();