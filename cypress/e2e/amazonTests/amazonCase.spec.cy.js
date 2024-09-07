describe('Amazon - Frontend Automation', () => {

  let products = []; // Array to store product details

  beforeEach(() => {
    cy.session('Log in to Amazon', () => {
      cy.visit('/');
      cy.contains("Hello, sign in").click();

      cy.fixture('credentials').then((credentials) => {
        cy.get('#ap_email').type(credentials.email);  // Enter email
        cy.get('#continue').click();
        cy.get('#ap_password').type(credentials.password);  // Enter password
        cy.get('#signInSubmit').click();
      });
    });
    cy.visit('/');
  });


  it.skip('Search for "Titan watch" & Store Product Information', () => {
    cy.get('#twotabsearchtextbox').type('Titan watch{enter}');  // Search product

    // Wait for the results to load
    cy.wait(2000);
    cy.get('.s-main-slot').should('exist');
    cy.wait(5000);

    // Get the list of products displayed on the page
    cy.get('[data-component-type="s-search-result"]', { timeout: 10000 }).each(($el, index) => {
      // Initialize an empty product object
      let product = {};

      // Get product name
      cy.wrap($el).find('h2 a span').then(($name) => {
        const productName = $name.text().trim();
        product.name = productName;

        // Get product URL
        const productUrl = $name.closest('a').attr('href');
        const fullUrl = `https://www.amazon.in${productUrl}`;
        product.url = fullUrl;

        // Get product price (if available)
        cy.wrap($el).find('.a-price-whole').then(($price) => {
          let productPrice = $price.text().trim();
          if (!productPrice) {
            productPrice = 'Price not available';
          }
          product.price = productPrice;

          // Store the product details in the array
          products.push(product);

          // Log product details
          cy.log(`Product ${index + 1}:`);
          cy.log(`  Name: ${product.name}`);
          cy.log(`  Price: ₹${product.price}`);
          cy.log(`  URL: ${product.url}`);
        });
      });
    }).then(() => {
      // After collecting all products, log the entire array of products
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
    cy.get('#twotabsearchtextbox').type('Titan watch{enter}');  // Search for the product
  
    // Wait for the results to load
    cy.wait(2000);
    cy.get('.s-main-slot').should('exist');
    cy.wait(5000);
  
    // Get the list of products displayed on the page
    cy.get('[data-component-type="s-search-result"]', { timeout: 10000 }).first().find('h2 a').then(($el) => {
      // Get the product URL from the href attribute
      const productUrl = $el.attr('href');
      const fullUrl = `https://www.amazon.in${productUrl}`;
  
      // Log the first product details
      cy.log('Navigating to the first product page...');
      cy.log(`Product URL: ${fullUrl}`);
  
      // Visit the product page in the same tab
      cy.visit(fullUrl);
  
      // Wait for the product page to load
      cy.wait(3000);
  
      // Add the product to the cart
      cy.get('#add-to-cart-button').should('exist').click();  // Click 'Add to Cart'
  
      // Wait for the cart page to load
      cy.wait(3000);
  
      // 1-Year Extended Warranty page is opened—this page may sometimes be displayed, and other times it may not.
      //cy.get('#attachSiNoCoverage-announce').click(); //Click 'Skip' button
      cy.get('#attachSiNoCoverage-announce').click({force:true});

      // Proceed to 'Buy Now' or 'Checkout'
      cy.get('input[name="proceedToRetailCheckout"]').should('exist').click();  // Click 'Proceed to Buy Now'
  
      //---Checkout Page

      //Delivery Address
      cy.get('[data-testid="Address_selectShipToThisAddress"]').click();
      cy.wait(2000);

      //Select Payment Method
      //Selected Upi
      cy.contains('Your available balance').should('be.visible');
      cy.get('.a-section > .a-color-base').click();    //Click on UPI
      cy.get('#pp-azOmLz-114').type(''); //Type Upi id
      cy.get('#pp-azOmLz-115 > .a-button-inner > .a-button-input').click(); //Click on 'Verify' button
      cy.get('#pp-K0pE1z-578').click(); //Click on 'Use this payment method' button

      // Optional: Verify that we are on the payment gateway page
      //cy.url().should('include', 'checkout');
    });
  });
  
  

});
