/**
 * Creates user data for the checkout process.
 * @param {object} overrides - Optional overrides for the default user data.
 * @returns {object} - The user data object.
 */
export function createCheckoutUserData(overrides = {}) {
    const defaultData = {
        firstName: 'Liam',
        lastName: "O'Connell",
        postalCode: 'M4W 1A1',
    };

    return { ...defaultData, ...overrides };
}