// cypress/e2e/api/user_list.cy.js

describe('ReqRes API - User List', () => {
    let expectedUsers;

    before(() => {
        cy.fixture('api_users_page2.json').then((users) => {
            expectedUsers = users;
        });
    });

    it('should fetch users from page 2 and validate user details', () => {
        cy.request('GET', 'https://reqres.in/api/users?page=2').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('page', 2);
            expect(response.body).to.have.property('per_page', 6);
            expect(response.body).to.have.property('total', 12);
            expect(response.body).to.have.property('total_pages', 2);
            expect(response.body).to.have.property('data').that.is.an('array');
            expect(response.body.data.length).to.eq(6); // or expectedUsers.length

            // Combined loop for data type, structure, and content validation:
            response.body.data.forEach((user, index) => {
                const expectedUser = expectedUsers[index];

                expect(user).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar');
                expect(user.id).to.be.a('number').and.eq(expectedUser.id);
                expect(user.email).to.be.a('string').and.include('@').and.eq(expectedUser.email);
                expect(user.first_name).to.be.a('string').and.eq(expectedUser.first_name);
                expect(user.last_name).to.be.a('string').and.eq(expectedUser.last_name);
                expect(user.avatar).to.be.a('string').and.include('https://').and.eq(expectedUser.avatar);
            });

            expect(response.body).to.have.property('support');
            expect(response.body.support).to.have.all.keys('url', 'text');
            expect(response.body.support.url).to.be.a('string').and.include('https://');
            expect(response.body.support.text).to.be.a('string');
        });
    });
});