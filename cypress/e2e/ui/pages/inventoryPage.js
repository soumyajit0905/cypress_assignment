import { InventoryPageLocators } from '../../../support/locators';

/**
 * Page object for the Inventory page.
 */
class InventoryPage {
    /**
     * Adds the specified items to the shopping cart.
     * @param {string[]} itemNames - An array of item names to add.
     */
    addItemsToCart(itemNames) {
        cy.addItemsToCart(itemNames);
    }

    /**
     * Navigates to the shopping cart page.
     */
    goToCart() {
        cy.get(InventoryPageLocators.cartLink).click();
    }

    /**
     * Finds and adds the highest or lowest priced item to the cart.
     * @param {string} type - 'highest' or 'lowest'.
     */
    addExtremumPricedItemToCart(type) {
        cy.findAndAddExtremumPricedItem(type);
    }

    /**
     * Verifies that the shopping cart badge exists.
     */
    verifyCartBadgeExists() {
        cy.get('.shopping_cart_badge').should('exist');
    }
}

export default new InventoryPage();