describe('ReqRes API - Delete User', () => {
    let userData;

    before(() => {
        cy.fixture('api_new_user.json').then((data) => {
            userData = data;
        });
    });

    it('should create a user and then delete the user', () => {
        cy.request('POST', 'https://reqres.in/api/users', userData).then((createResponse) => {
            expect(createResponse.status).to.eq(201);
            const userId = createResponse.body.id;
            cy.log('Create Response Body:', createResponse.body);

            cy.request('DELETE', `https://reqres.in/api/users/${userId}`).then((deleteResponse) => {
                cy.log('Delete Response Status:', deleteResponse.status);

                expect(deleteResponse.status).to.eq(204); // Assert 204 No Content
                expect(deleteResponse.body).to.be.empty; // Assert empty response body (important!)

                // Optional: Verify that the user is actually deleted (if the API supports it):
                /*cy.request({
                    method: 'GET',
                    url: `https://reqres.in/api/users/${userId}`,
                    failOnStatusCode: false // Important: We expect a 404
                }).then((verifyResponse) => {
                    expect(verifyResponse.status).to.eq(404);
                });*/
                cy.request({
                    method: 'GET',
                    url: `https://reqres.in/api/users/${userId}`,
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(404);
                    // If the API returns an error message:
                    if (response.body && response.body.error) {
                        expect(response.body.error).to.eq('User not found'); // Or whatever the API returns
                    }
                });
            });
        });
    });
});