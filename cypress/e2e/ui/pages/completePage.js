import { CompletePageLocators } from '../../../support/locators';

/**
 * Page object for the Order Confirmation (Complete) page.
 */
class CompletePage {
    /**
     * Verifies the order confirmation message displayed on the page.
     * @param {object} messages - An object containing the expected header and text of the confirmation message.
     * @param {string} messages.header - The expected header text.
     * @param {string} messages.text - The expected confirmation text.
     */
    verifyOrderConfirmation(messages) {
        cy.get(CompletePageLocators.completeHeader).should('contain', messages.header);
        cy.get(CompletePageLocators.completeText).should('contain', messages.text);
    }
}

export default new CompletePage();