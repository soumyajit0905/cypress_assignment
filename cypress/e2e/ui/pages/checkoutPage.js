import { CheckoutPageLocators } from '../../../support/locators';
import { createCheckoutUserData } from '../../../support/dataFactories';

/**
 * Page object for the Checkout page.
 */
class CheckoutPage {
    /**
     * Fills the checkout form with the provided user data.
     * @param {object} userData - An object containing the user's first name, last name, and postal code.
     */
    fillForm(userData) {
        const data = createCheckoutUserData(userData);
        cy.fillCheckoutForm(data);
    }

    /**
     * Clicks the "Continue" button to proceed to the checkout overview page.
     */
    continueToOverview() {
        cy.get(CheckoutPageLocators.continueButton).click();
    }
}

export default new CheckoutPage();