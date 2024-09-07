import AmazonSearchPage from '../../pageObjects/AmazonSearchPage';
import ProductPage from '../../pageObjects/ProductPage';

describe('Amazon - Frontend Automation', () => {
  const amazonSearchPage = new AmazonSearchPage();
  const productPage = new ProductPage();

  let products = []; // Array to store product details

  beforeEach(() => {
    cy.session('Log in to Amazon', () => {
      amazonSearchPage.visit();
      amazonSearchPage.signIn();

      cy.fixture('credentials').then((credentials) => {
        amazonSearchPage.enterEmail(credentials.email);
        amazonSearchPage.enterPassword(credentials.password);
      });
    });
    amazonSearchPage.visit();
  });

  it('Search for "Titan watch" & Store Product Information', () => {
    amazonSearchPage.searchForProduct('Titan watch');
    cy.wait(3000);
    amazonSearchPage.getProductList().should('exist');
    cy.log("Wait for a while, all the products details are getting saved.")
    cy.wait(3000);
    amazonSearchPage.getProductList().each(($el, index) => {
      let product = {};

      cy.wrap($el).find('h2 a span').then(($name) => {
        const productName = $name.text().trim();
        product.name = productName;

        const productUrl = $name.closest('a').attr('href');
        const fullUrl = `https://www.amazon.in${productUrl}`;
        product.url = fullUrl;

        cy.wrap($el).find('.a-price-whole').then(($price) => {
          let productPrice = $price.text().trim();
          if (!productPrice) {
            productPrice = 'Price not available';
          }
          product.price = productPrice;

          products.push(product);

          cy.log(`Product ${index + 1}:`);
          cy.log(`  Name: ${product.name}`);
          cy.log(`  Price: ₹${product.price}`);
          cy.log(`  URL: ${product.url}`);
        });
      });
    }).then(() => {
      console.log('All Products:', products);
      cy.wait(2000);
      products.forEach((product, index) => {
        cy.log(`Product ${index + 1}:`);
        cy.log(`  Name: ${product.name}`);
        cy.log(`  Price: ₹${product.price}`);
        cy.log(`  URL: ${product.url}`);
      });

      cy.writeFile('cypress/fixtures/product_data.json', products);
    });
  });

  it('Product Add to Cart & Payment Gateway', () => {
    amazonSearchPage.searchForProduct('Titan watch');
    cy.wait(3000);
    amazonSearchPage.getProductList().should('exist');
    cy.wait(3000);
    amazonSearchPage.clickFirstProduct();
    cy.wait(3000);   
    productPage.addToCart();  
    productPage.skipWarranty();
    productPage.proceedToCheckout();
    productPage.selectDeliveryAddress();
    productPage.selectPaymentMethod();
  });
});
