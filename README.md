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

### Test Scenarios
####<TestSuiteName>
#####<TestCaseName>


In case any of the items are not clear or if you want more information about something, please feel free to get in touch with me.
