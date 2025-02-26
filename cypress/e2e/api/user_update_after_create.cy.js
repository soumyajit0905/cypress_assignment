// cypress/e2e/api/user_update_after_create.cy.js

describe('ReqRes API - Create and Update User', () => {
    let userData;
    let updatedUserData;

    before(() => {
        cy.fixture('api_new_user.json').then((data) => {
            userData = data;
        });
        cy.fixture('api_updated_user.json').then((data) => {
            updatedUserData = data;
        });
    });

    it('should create a user, then update the user, and validate responses', () => {
        cy.request('POST', 'https://reqres.in/api/users', userData).then((createResponse) => {
            expect(createResponse.status).to.eq(201);
            const userId = createResponse.body.id; // Capture the ID of the created user
            cy.log('Create Response Body:', createResponse.body);

            cy.request('PUT', `https://reqres.in/api/users/${userId}`, updatedUserData).then((updateResponse) => {
                cy.log('Update Request Body:', updatedUserData);
                cy.log('Update Response Status:', updateResponse.status);
                cy.log('Update Response Body:', updateResponse.body);

                expect(updateResponse.status).to.eq(200);
                expect(updateResponse.body).to.have.property('name', updatedUserData.name);
                expect(updateResponse.body).to.have.property('job', updatedUserData.job);
                expect(updateResponse.body).to.have.property('updatedAt');
                expect(updateResponse.body.updatedAt).to.be.a('string');

                const updatedAtRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
                expect(updateResponse.body.updatedAt).to.match(updatedAtRegex);
            });
        });
    });
});