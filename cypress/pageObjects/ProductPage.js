// cypress/pageObjects/ProductPage.js
class ProductPage {
    addToCart() {
        cy.get('#add-to-cart-button').should('exist').click();
        cy.wait(3000);
    }

    proceedToCheckout() {
        cy.get('input[name="proceedToRetailCheckout"]').should('exist').click();
    }

    skipWarranty() {
        cy.get('#attachSiNoCoverage-announce').click({ force: true });
    }

    selectDeliveryAddress() {
        cy.get('[data-testid="Address_selectShipToThisAddress"]').click();
        cy.wait(3000);
    }

    selectPaymentMethod() {
        cy.contains('Your available balance').should('be.visible');
        cy.get('.a-section > .a-color-base').click();
        //cy.get('#pp-azOmLz-114').type(''); // Type UPI ID
        //cy.get('#pp-azOmLz-115 > .a-button-inner > .a-button-input').click();
        //cy.get('#pp-K0pE1z-578').click(); // Use this payment method
    }
}

export default ProductPage;
