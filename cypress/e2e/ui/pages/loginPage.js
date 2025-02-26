/**
 * Page object for the Login page.
 */
class LoginPage {

    /**
     * Logs in the user with the provided credentials.
     * @param {string} username - The username to use for login.
     * @param {string} password - The password to use for login.
     */
    static login(username, password) {
        cy.get('[data-test="username"]').type(username);
        cy.get('[data-test="password"]').type(password);
        cy.get('[data-test="login-button"]').click();
        cy.url().should('include', '/inventory.html'); // Assert navigation to inventory page
    }
}

export default LoginPage;