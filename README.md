# Project Name: cypress_ecommerce
This project will automate the process of searching for products, adding items to the cart, and navigating to the payment gateway screen on e-commerce websites like Amazon.in and Flipkart.in using Cypress.

### Project Overview
The objective of this project is to:

Automate the searching of a specified product ("Titan watch") on Amazon.in and Flipkart.in.
Scrape product details such as name, price, and product link.
Follow the flow of adding the product to cart, proceeding to the "Buy Now" screen up to the payment gateway. Do not complete the purchase.

### Prerequisites
To run this project on your machine, please make sure you have the following installed:

* Node.js (version 12.x or higher)
* Git for version control
* Cypress (version 10.x or higher)

### Getting Started
1. Clone the repository

2. Open your terminal and run:
> git clone https://github.com/your-username/cypress_ecommerce.git

3. Move into project directory
> cd cypress_ecommerce

4. Dependencies Setup - Install all the dependencies using following command:
> npm install

5. To open Cypress To open Cypress, run, below command will open the Cypress test runner.
> npx cypress open

6. Run test - To run test suite, simply:
Open the E2E Testing in Cypress Dashboard. Choose browser of your choice; here, Chrome. Click on the test file to run it, or run all tests at once.

### Project Structure
The folders and files of importance in this project:

* cypress/: All Cypress-related files and folders reside here.
* cypress/e2e/: The test files doing the automation magic are hosted here.
* cypress/fixtures/: Test data is kept here. In other words, product search terms.
* cypress/support/: All the helper functions and support files are placed here.
* package.json: This contains most of the metadata relevant to the project, including dependencies.
* README.md: Documentation for the project - that's this.

### Amazon - Frontend Automation Cases
##### Case 1. Log in to Amazon
##### Case 2. Search for "Titan watch" & Store Product Information
##### Case 3. Product Add to Cart & Payment Gateway

### Json Placeholder Open API - Backend Automation Cases
##### Case 1: POST: Should create a new user
##### Case 2: GET: Should fetch a specific user by ID
##### Case 3: GET: Should fetch users filtered by username
##### Case 4: POST: Should create a new user with address
##### Case 5: PUT: Should update a user's name
##### Case 6: DELETE: Should delete a user by ID
##### Case 7: GET: Should fetch posts by a specific user
##### Case 8: PATCH: Should partially update a user's email
##### Case 9: GET: Should validate response headers
##### Case 10: GET: Should ensure the response time is below 1 second
##### Case 11: GET: Should return 401 for unauthorized access
##### Case 12: POST: Should return 400 for invalid JSON data
##### Case 13: GET: Should return 404 for non-existent resource
##### Case 14: GET: Should check all users have unique email addresses
##### Case 15: GET: Should validate the JSON schema of user response
##### Case 16: POST: Should return 400 for an empty POST request
##### Case 17: POST: Should handle special characters in user's name
##### Case 18: GET: Should ensure all user emails have valid domains
##### Case 19: DELETE: Should return 404 when deleting a non-existent user
##### Case 20: GET: Should ensure all users have unique usernames
##### Case 21: GET: Should ensure at least one user has a website
##### Case 22: GET: Should fetch user data
##### Case 23: GET: Should return 404 for non-existent user

### Mochawesome Report
> npm i --save-dev cypress-mochawesome-reporter

for more info follow this url https://www.npmjs.com/package/cypress-mochawesome-reporter
After each execution, a report will be generated at this path: '\cypress tutorial\cypress_ecommerce\cypress\reports'. If any test cases fail, a screenshot will also be generated in the same path.

### Backend Execution Headless Command
> npx cypress run --spec "D:/Other/Tutorial/cypress tutorial/cypress_ecommerce/cypress/e2e/backendTests/restAPICases.spec.cy.js"

In case any of the items are not clear or if you want more information about something, please feel free to get in touch with me.
