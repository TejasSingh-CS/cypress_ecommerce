describe('API Tests', () => {

    before(() => {
        // Override baseUrl for this test file
        Cypress.config('baseUrl', 'https://jsonplaceholder.typicode.com');
    });

    it('POST: Should create a new user', () => {
        cy.request('POST', '/users', {
            name: 'John Doe',
            email: 'john@example.com'
        }).then((response) => {
            // Log the full response
            cy.log(JSON.stringify(response));

            // Assertions
            expect(response.status).to.eq(201);
        });
    });

    it('GET: Should fetch a specific user by ID', () => {
        cy.request('GET', '/users/1')
            .then((response) => {
                cy.log(JSON.stringify(response));
                expect(response.status).to.eq(200);
                expect(response.body.id).to.eq(1);
            });
    });

    it('GET: Should fetch users filtered by username', () => {
        cy.request({
            method: 'GET',
            url: '/users',
            qs: { username: 'Bret' }  // Query string
        }).then((response) => {
            cy.log(JSON.stringify(response));
            expect(response.status).to.eq(200);
            expect(response.body[0].username).to.eq('Bret');
        });
    });

    it('POST: Should create a new user with address', () => {
        cy.request('POST', '/users', {
            name: 'Jane Doe',
            email: 'jane@example.com',
            address: {
                street: '123 Main St',
                city: 'Metropolis'
            }
        }).then((response) => {
            cy.log(JSON.stringify(response));
            expect(response.status).to.eq(201);
            expect(response.body.name).to.eq('Jane Doe');
        });
    });

    it('PUT: Should update a user\'s name', () => {
        cy.request('PUT', '/users/1', {
            name: 'Updated Name'
        }).then((response) => {
            cy.log(JSON.stringify(response));
            expect(response.status).to.eq(200);
            expect(response.body.name).to.eq('Updated Name');
        });
    });

    it('DELETE: Should delete a user by ID', () => {
        cy.request('DELETE', '/users/1')
            .then((response) => {
                cy.log(JSON.stringify(response));
                expect(response.status).to.eq(200);
            });
    });

    it('GET: Should fetch posts by a specific user', () => {
        cy.request('GET', '/posts?userId=1')
            .then((response) => {
                cy.log(JSON.stringify(response));
                expect(response.status).to.eq(200);
                expect(response.body.length).to.be.greaterThan(0);
            });
    });

    it('PATCH: Should partially update a user\'s email', () => {
        cy.request('PATCH', '/users/1', {
            email: 'newemail@example.com'
        }).then((response) => {
            cy.log(JSON.stringify(response));
            expect(response.status).to.eq(200);
            expect(response.body.email).to.eq('newemail@example.com');
        });
    });

    it('GET: Should validate response headers', () => {
        cy.request('GET', '/users')
            .then((response) => {
                cy.log(JSON.stringify(response));
                expect(response.headers).to.have.property('content-type').and.contain('application/json');
            });
    });

    it('GET: Should ensure the response time is below 1 second', () => {
        cy.request('GET', '/users')
            .then((response) => {
                cy.log(JSON.stringify(response));
                expect(response.duration).to.be.lessThan(1000); // Time in milliseconds
            });
    });

    it('GET: Should return 401 for unauthorized access', () => {
        cy.request({
          method: 'GET',
          url: '/protected-endpoint',
          failOnStatusCode: false
        }).then((response) => {
          cy.log(JSON.stringify(response));
          expect(response.status).to.eq(401);  // Ensure this endpoint is correctly set up to require authorization
        });
      });
      

    it('POST: Should return 400 for invalid JSON data', () => {
        cy.request({
          method: 'POST',
          url: '/users',
          body: 'Invalid JSON',  // Ensure this is indeed considered invalid by the API
          failOnStatusCode: false
        }).then((response) => {
          cy.log(JSON.stringify(response));
          expect(response.status).to.eq(400);  // Verify API behavior for invalid JSON
        });
      });
      

    it('GET: Should return 404 for non-existent resource', () => {
        cy.request({
            method: 'GET',
            url: '/non-existent-endpoint',
            failOnStatusCode: false
        }).then((response) => {
            cy.log(JSON.stringify(response));
            expect(response.status).to.eq(404);
        });
    });

    it('GET: Should check all users have unique email addresses', () => {
        cy.request('GET', '/users')
            .then((response) => {
                cy.log(JSON.stringify(response));
                const emails = response.body.map(user => user.email);
                const uniqueEmails = new Set(emails);
                expect(uniqueEmails.size).to.eq(emails.length);
            });
    });

    it('GET: Should validate the JSON schema of user response', () => {
        cy.request('GET', '/users')
            .then((response) => {
                cy.log(JSON.stringify(response));
                expect(response.body[0]).to.have.all.keys('id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company');
            });
    });

    it('POST: Should return 400 for an empty POST request', () => {
        cy.request({
          method: 'POST',
          url: '/users',
          body: {},  // Verify if empty body should cause an error
          failOnStatusCode: false
        }).then((response) => {
          cy.log(JSON.stringify(response));
          expect(response.status).to.eq(400);  // Ensure the API is expected to return 400 for empty requests
        });
      });     

    it('POST: Should handle special characters in user\'s name', () => {
        cy.request('POST', '/users', {
            name: 'J@ne D!oe',
            email: 'specialchar@example.com'
        }).then((response) => {
            cy.log(JSON.stringify(response));
            expect(response.status).to.eq(201);
        });
    });

    it('GET: Should ensure all user emails have valid domains', () => {
        cy.request('GET', '/users')
            .then((response) => {
                cy.log(JSON.stringify(response));
                response.body.forEach(user => {
                    expect(user.email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); // Regex for valid email
                });
            });
    });

    it('DELETE: Should return 404 when deleting a non-existent user', () => {
        cy.request({
          method: 'DELETE',
          url: '/users/999',
          failOnStatusCode: false
        }).then((response) => {
          cy.log(JSON.stringify(response));
          expect(response.status).to.eq(404);  // Verify the API's handling of non-existent resources
        });
      });      

    it('GET: Should ensure all users have unique usernames', () => {
        cy.request('GET', '/users')
            .then((response) => {
                cy.log(JSON.stringify(response));
                const usernames = response.body.map(user => user.username);
                const uniqueUsernames = new Set(usernames);
                expect(uniqueUsernames.size).to.eq(usernames.length);
            });
    });

    it('GET: Should ensure at least one user has a website', () => {
        cy.request('GET', '/users')
            .then((response) => {
                cy.log(JSON.stringify(response));
                const websites = response.body.map(user => user.website);
                const websiteExists = websites.some(website => website !== '');
                expect(websiteExists).to.be.true;
            });
    });

    it('GET: Should fetch user data', () => {
        cy.request('GET', '/users')
            .then((response) => {
                // Log the full response
                cy.log(JSON.stringify(response));

                // Assertions
                expect(response.status).to.eq(200);
                expect(response.body).to.have.lengthOf(10);
            });
    });

    it('GET: Should return 404 for non-existent user', () => {
        cy.request({ method: 'GET', url: '/users/999', failOnStatusCode: false })
            .then((response) => {
                // Log the full response
                cy.log(JSON.stringify(response));

                // Assertions
                expect(response.status).to.eq(404);
            });
    });


});
