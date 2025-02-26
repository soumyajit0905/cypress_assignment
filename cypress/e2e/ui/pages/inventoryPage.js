/**
 * Page object for the Inventory page.
 */
class InventoryPage {

    /**
     * Adds the specified items to the shopping cart.
     * @param {string[]} itemNames - An array of item names to add.
     */
    static addItemsToCart(itemNames) {
        cy.addItemsToCart(itemNames); // Calls the custom command to add items
    }

    /**
     * Navigates to the shopping cart page.
     */
    static goToCart() {
        cy.get('[data-test="shopping-cart-link"]').click();
    }
}

export default InventoryPage;