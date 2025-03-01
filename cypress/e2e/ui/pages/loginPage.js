import { LoginPageLocators } from '../../../support/locators';

/**
 * Page object for the Login page.
 */
class LoginPage {
    /**
     * Logs in the user with the provided credentials.
     * @param {string} username - The username to use for login.
     * @param {string} password - The password to use for login.
     */
    login(username, password) {
        cy.get(LoginPageLocators.usernameField).type(username);
        cy.get(LoginPageLocators.passwordField).type(password);
        cy.get(LoginPageLocators.loginButton).click();
        cy.url().should('include', '/inventory.html');
    }
}

export default new LoginPage();