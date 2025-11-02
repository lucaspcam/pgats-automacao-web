class CartPage {
    elements = {
        // Cart products
        cartProducts: () => cy.get('#cart_info_table tbody tr'),
        productPrice: () => cy.get('.cart_price p'),
        productQuantity: () => cy.get('.cart_quantity button'),
        productTotalPrice: () => cy.get('.cart_total_price'),
        
        // Checkout process
        proceedToCheckoutButton: () => cy.get('.btn.btn-default.check_out'),
        placeOrderButton: () => cy.get('.btn.btn-default.check_out'),
        commentTextArea: () => cy.get('textarea.form-control'),
        addressDetails: () => cy.contains('Address Details'),
        reviewOrder: () => cy.contains('Review Your Order'),
        
        // Payment details
        nameOnCard: () => cy.get('[data-qa="name-on-card"]'),
        cardNumber: () => cy.get('[data-qa="card-number"]'),
        cvc: () => cy.get('[data-qa="cvc"]'),
        expiryMonth: () => cy.get('[data-qa="expiry-month"]'),
        expiryYear: () => cy.get('[data-qa="expiry-year"]'),
        payButton: () => cy.get('[data-qa="pay-button"]'),
        
        // Order confirmation
        orderSuccessMessage: () => cy.contains('Congratulations! Your order has been confirmed!')
    }

    verifyProductInCart(productName) {
        cy.get('.cart_description').should('contain', productName)
    }

    proceedToCheckout() {
        this.elements.proceedToCheckoutButton().click()
    }

    placeOrder() {
        this.elements.placeOrderButton().click()
    }

    verifyCartPage() {
        this.elements.cartProducts().should('be.visible')
    }

    verifyCartDetails(productDetails) {
        this.elements.cartProducts().within(() => {
            cy.get('.cart_description').should('contain', productDetails.name)
            cy.get('.cart_price p').should('contain', productDetails.price)
            cy.get('.cart_quantity button').should('contain', productDetails.quantity)
            cy.get('.cart_total_price').should('contain', productDetails.totalPrice)
        })
    }

    proceedToCheckout() {
        this.elements.proceedToCheckoutButton().click()
    }

    verifyAddressDetailsAndReview() {
        this.elements.addressDetails().should('be.visible')
        this.elements.reviewOrder().should('be.visible')
    }

    addComment(comment) {
        this.elements.commentTextArea().should('be.visible').type(comment)
    }

    placeOrder() {
        this.elements.placeOrderButton().click()
    }

    fillPaymentDetails(paymentInfo) {
        this.elements.nameOnCard().should('be.visible').type(paymentInfo.nameOnCard)
        this.elements.cardNumber().type(paymentInfo.cardNumber)
        this.elements.cvc().type(paymentInfo.cvc)
        this.elements.expiryMonth().type(paymentInfo.expiryMonth)
        this.elements.expiryYear().type(paymentInfo.expiryYear)
    }

    confirmPayment() {
        this.elements.payButton().click()
    }

    verifyOrderSuccess() {
        this.elements.orderSuccessMessage()
            .should('be.visible')
            .and('contain', 'Congratulations! Your order has been confirmed!')
    }
}

export default new CartPage()