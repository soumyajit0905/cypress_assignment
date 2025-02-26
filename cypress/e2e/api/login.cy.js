// cypress/e2e/api/login.cy.js

describe('ReqRes API - Login', () => {
    let loginData;

    before(() => {
        cy.fixture('api_login_data.json').then((data) => {
            loginData = data;
        });
    });

    it('should login and return a valid token', () => {
        cy.request('POST', 'https://reqres.in/api/login', {
            email: loginData.validEmail,
            password: loginData.validPassword
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');
            const token = response.body.token;
            expect(token).to.be.a('string');
            expect(token).to.not.be.empty;
            cy.wrap(token).as('authToken'); // Store token for potential later use
        });
    });

    it('should login with incorrect email', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/login',
            body: {
                email: loginData.invalidEmail, // Incorrect email
                password: loginData.validPassword
            },
            failOnStatusCode: false // Allow non-2xx/3xx status codes
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.eq('user not found'); // Expected error message
        });
    });

    it('should login with missing password', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/login',
            body: {
                email: loginData.validEmail // Email provided, password missing
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.eq('Missing password'); // Expected error message
        });
    });
});