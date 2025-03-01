import LoginPage from './pages/loginPage';
import InventoryPage from './pages/inventoryPage';
import CartPage from './pages/cartPage';
import CheckoutPage from './pages/checkoutPage';
import OverviewPage from './pages/overviewPage';
import CompletePage from './pages/completePage';

/**
 * Test suite for the SauceDemo order flow.
 */
describe('SauceDemo Order Flow', () => {
  let userData;
  let itemsToAdd;
  let confirmationMessages;

  /**
   * Runs before all tests in the suite.  Loads fixture data.
   */
  before(() => {
    cy.fixture('CheckOutUser.json').then((data) => {
      userData = data; // User data for checkout
    });
    cy.fixture('itemsToAdd.json').then((items) => {
      itemsToAdd = items.itemNames; // Items to add to cart
    });
    cy.fixture('orderConfirmationMessages.json').then((messages) => {
      confirmationMessages = messages; // Order confirmation messages
    });
  });

  /**
   * Runs before each test in the suite.  Visits the home page.
   */
  beforeEach(() => {
    cy.visit('/'); // Navigate to the application's base URL
  });

  /**
   * Test case: Completes the full order process.
   */
  it('should complete the order process', () => {
    const username = Cypress.env('username');
    const password = Cypress.env('password');
    LoginPage.login(username, password); // Log in using page object

    InventoryPage.addItemsToCart(itemsToAdd); // Add items to cart using page object and custom command
    InventoryPage.goToCart(); // Go to the cart page

    CartPage.getCartItemDetails().then((cartItemDetails) => { // Get cart item details
      CartPage.goToCheckout(); // Go to checkout page

      CheckoutPage.fillForm(userData); // Fill out the checkout form
      CheckoutPage.continueToOverview(); // Proceed to the overview page

      OverviewPage.verifySummaryInformation(cartItemDetails); // Verify summary information
    });

    OverviewPage.finishCheckout(); // Finish the checkout process
    CompletePage.verifyOrderConfirmation(confirmationMessages); // Verify the order confirmation message
  });
  
});