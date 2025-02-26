describe('ReqRes API - Create User', () => {
    let userData; // Variable to store user data from fixture

    before(() => {
        cy.fixture('api_new_user.json').then((data) => {
            userData = data;
        });
    });

    it('should create a new user and validate response fields', () => {
        cy.request('POST', 'https://reqres.in/api/users', userData).then((response) => {
            // Log the request and response:
            cy.log('Request Body:', userData);
            cy.log('Response Status:', response.status);
            cy.log('Response Body:', response.body); // Crucial: Log the response body

            expect(response.status).to.eq(201);

            expect(response.body).to.have.property('name', userData.name);
            expect(response.body).to.have.property('job', userData.job);
            expect(response.body).to.have.property('id');
            expect(response.body.id).to.be.a('string');
            expect(response.body).to.have.property('createdAt');
            expect(response.body.createdAt).to.be.a('string');

            const createdAtRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
            expect(response.body.createdAt).to.match(createdAtRegex);
        });
    });
});