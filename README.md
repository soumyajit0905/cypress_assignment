# Cypress UI and API Testing Assignment

This repository contains Cypress tests for UI and API automation, fulfilling the assignment requirements using SauceDemo (UI) and ReqRes (API).

## Dependencies

* Cypress: `npm install cypress --save-dev`

## Setup and Execution

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/soumyajit0905/cypress_assignment.git](https://github.com/soumyajit0905/cypress_assignment.git)
    cd cypress_assignment
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run UI tests:**

    ```bash
    npx cypress open --e2e
    ```

    This will open the Cypress Test Runner, where you can select and run the UI tests. The main test file is `saucedemo_order_flow.cy.js`.

4.  **Run API tests:**

    ```bash
    npx cypress run --e2e api
    ```

    This command will run the API tests in headless mode. Alternatively, you can run them through the Test Runner using `npx cypress open --e2e` and selecting the API specs.

## UI Test Details

* **Page Object Model (POM):** Implemented for better code organization and maintainability. Page objects are located in the `cypress/e2e/ui/pages` folder.
* **Custom Commands:** Reusable actions are defined as custom commands in `cypress/support/commands.js`.
* **Data-Driven Testing:** Test data (user credentials, items to add, confirmation messages) is stored in JSON files within the `cypress/fixtures` folder.
* **Screenshots on Failure:** Cypress automatically captures screenshots when tests fail, which are stored in the `cypress/screenshots` folder.
* **Test Cases:**
    * Login with valid credentials.
    * Add random products to the cart dynamically.
    * Proceed to checkout and complete the order.
    * Validate order confirmation message and item details.
    * Test cases for the highest and lowest priced items.
* **Factory Pattern:** Data factories are implemented in `cypress/support/dataFactories.js` for dynamic test data creation.
* **Locator Repository:** Locators are stored in `cypress/support/locators.js` for better selector management.

## API Test Details

* **Base URL:** `https://reqres.in/`
* **Test Cases:**
    * Login API: POST request to `/api/login` and validate the token.
    * User List API: GET request to `/api/users?page=2` and validate user details.
    * Create User API: POST request to `/api/users` and validate response fields.
    * Update User API: PUT/PATCH request to `/api/users/2` (or a specific user ID) and validate the response.
    * Delete User API: DELETE request to `/api/users/2` (or a specific user ID) and validate status code 204.
