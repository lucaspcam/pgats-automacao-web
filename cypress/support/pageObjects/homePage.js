class HomePage {
    elements = {
        signupLoginLink: () => cy.get('a[href="/login"]'),
        logoutLink: () => cy.get('a[href="/logout"]'),
        deleteAccountLink: () => cy.get('a[href="/delete_account"]'),
        productsLink: () => cy.get('a[href="/products"]'),
        cartLink: () => cy.get('.shop-menu a[href="/view_cart"]').first(),
        contactUsLink: () => cy.get('a[href="/contact_us"]'),
        loggedInAs: () => cy.get('a:contains("Logged in as")'),
        footer: () => cy.get('footer'),
        subscriptionTitle: () => cy.get('.single-widget h2'),
        subscriptionEmail: () => cy.get('#susbscribe_email'),
        subscribeButton: () => cy.get('#subscribe'),
        subscriptionSuccess: () => cy.get('.alert-success'),
        shopMenu: () => cy.get('.shop-menu'),
        homeButton: () => cy.get('a[href="/"]'),
        addToCartButtons: () => cy.get('.add-to-cart'),
        cartModal: () => cy.get('#cartModal'),
        continueShoppingButton: () => cy.get('.modal-footer .btn-success'),
        viewCartModalButton: () => cy.get('.modal-footer [href="/view_cart"]')
    }

    verifyCommonElements() {
        this.elements.shopMenu().should('be.visible')
    }

    verifyHomePageVisible() {
        cy.url().should('include', '/')
        this.verifyCommonElements()
    }

    navigateToHome() {
        cy.visit('/')
        this.verifyHomePageVisible()
    }

    clickSignupLogin() {
        this.elements.signupLoginLink().should('be.visible').click()
    }

    clickLogout() {
        this.elements.logoutLink().should('be.visible').click()
    }

    clickDeleteAccount() {
        this.elements.deleteAccountLink().should('be.visible').click()
    }

    clickProducts() {
        this.elements.productsLink().should('be.visible').click()
    }

    clickCart() {
        this.elements.cartLink().should('be.visible').click()
    }

    clickContactUs() {
        this.elements.contactUsLink().should('be.visible').click()
    }

    verifyLoggedInAs(username) {
        this.elements.loggedInAs()
            .should('be.visible')
            .and('contain', username)
    }

    addToCart(productIndex) {
        this.elements.addToCartButtons().eq(productIndex).click()
        
        // Aguarda o modal aparecer
        this.elements.cartModal().should('be.visible')
        
        // Clica em "Continue Shopping" para fechar o modal
        this.elements.continueShoppingButton().click()
        
        // Aguarda o modal desaparecer
        this.elements.cartModal().should('not.be.visible')
    }

    verifySubscriptionTitle() {
        this.elements.footer().scrollIntoView()
        cy.wait(1000) // Aguarda o scroll completar
        
        this.elements.subscriptionTitle()
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim().toUpperCase()).to.include('SUBSCRIPTION')
            })
    }

    subscribeNewsletter(email) {
        this.elements.subscriptionEmail().should('be.visible').type(email)
        this.elements.subscribeButton().should('be.visible').click()
    }

    verifySubscriptionSuccess() {
        this.elements.subscriptionSuccess()
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.include('You have been successfully subscribed!')
            })
    }

    viewCart() {
        // Se houver um modal visível, usa o botão de View Cart do modal
        this.elements.cartModal()
            .then($modal => {
                if ($modal.hasClass('show')) {
                    this.elements.viewCartModalButton().click()
                } else {
                    this.elements.cartLink().click()
                }
            })
    }
}

export default new HomePage()