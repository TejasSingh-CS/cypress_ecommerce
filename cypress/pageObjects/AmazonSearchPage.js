// cypress/pageObjects/AmazonSearchPage.js
class AmazonSearchPage {
    visit() {
      cy.visit('/');
    }
  
    signIn() {
      cy.contains("Hello, sign in").click();
    }
  
    enterEmail(email) {
      cy.get('#ap_email').type(email);
      cy.get('#continue').click();
    }
  
    enterPassword(password) {
      cy.get('#ap_password').type(password);
      cy.get('#signInSubmit').click();
    }
  
    searchForProduct(productName) {
      return cy.get('#twotabsearchtextbox').type(`${productName}{enter}`);
    }
  
    getProductList() {
      return cy.get('[data-component-type="s-search-result"]');
    }
  
    clickFirstProduct() {
      cy.get('[data-component-type="s-search-result"]').first().find('h2 a').then(($el) => {
        const productUrl = $el.attr('href');
        const fullUrl = `https://www.amazon.in${productUrl}`;
        cy.log('Navigating to the first product page...');
        cy.log(`Product URL: ${fullUrl}`);
        cy.visit(fullUrl);
      });
    }
  }
  
  export default AmazonSearchPage;
  