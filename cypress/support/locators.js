/**
 * Object containing locators for the Login page.
 */
export const LoginPageLocators = {
    usernameField: '[data-test="username"]',
    passwordField: '[data-test="password"]',
    loginButton: '[data-test="login-button"]',
  };
  
  /**
   * Object containing locators for the Inventory page.
   */
  export const InventoryPageLocators = {
    inventoryItem: '[data-test="inventory-item"]',
    inventoryItemName: '[data-test="inventory-item-name"]',
    addToCartButton: '[data-test^="add-to-cart"]',
    cartLink: '[data-test="shopping-cart-link"]',
  };
  
  /**
   * Object containing locators for the Cart page.
   */
  export const CartPageLocators = {
    cartItem: '.cart_item',
    cartItemName: '[data-test="inventory-item-name"]',
    cartItemPrice: '[data-test="inventory-item-price"]',
    checkoutButton: '[data-test="checkout"]',
  };
  
  /**
   * Object containing locators for the Checkout page.
   */
  export const CheckoutPageLocators = {
    firstNameField: '[data-test="firstName"]',
    lastNameField: '[data-test="lastName"]',
    postalCodeField: '[data-test="postalCode"]',
    continueButton: '[data-test="continue"]',
  };
  
  /**
   * Object containing locators for the Overview page.
   */
  export const OverviewPageLocators = {
    summaryInfo: '.summary_info',
    cartItemList: '.cart_list .cart_item',
    subtotalLabel: '[data-test="subtotal-label"]',
    taxLabel: '[data-test="tax-label"]',
    totalLabel: '[data-test="total-label"]',
    paymentInfoValue: '[data-test="payment-info-value"]',
    shippingInfoValue: '[data-test="shipping-info-value"]',
    finishButton: '[data-test="finish"]',
  };
  
  /**
   * Object containing locators for the Complete page.
   */
  export const CompletePageLocators = {
    completeHeader: '[data-test="complete-header"]',
    completeText: '[data-test="complete-text"]',
  };