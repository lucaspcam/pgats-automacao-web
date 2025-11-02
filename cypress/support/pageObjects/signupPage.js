class SignupPage {
    elements = {
        // Account Information
        pageTitle: () => cy.get('h2.title.text-center'),
        signupForm: () => cy.get('form[action="/signup"]'),
        titleMr: () => cy.get('#id_gender1'),
        titleMrs: () => cy.get('#id_gender2'),
        password: () => cy.get('[data-qa="password"]'),
        days: () => cy.get('#days'),
        months: () => cy.get('#months'),
        years: () => cy.get('#years'),
        newsletter: () => cy.get('#newsletter'),
        specialOffers: () => cy.get('#optin'),
        
        // Address Information
        firstName: () => cy.get('[data-qa="first_name"]'),
        lastName: () => cy.get('[data-qa="last_name"]'),
        company: () => cy.get('[data-qa="company"]'),
        address1: () => cy.get('[data-qa="address"]'),
        address2: () => cy.get('[data-qa="address2"]'),
        country: () => cy.get('#country'),
        state: () => cy.get('[data-qa="state"]'),
        city: () => cy.get('[data-qa="city"]'),
        zipcode: () => cy.get('[data-qa="zipcode"]'),
        mobileNumber: () => cy.get('[data-qa="mobile_number"]'),
        
        // Account Actions
        createAccountButton: () => cy.get('[data-qa="create-account"]'),
        accountCreatedTitle: () => cy.get('[data-qa="account-created"]'),
        accountDeletedTitle: () => cy.get('[data-qa="account-deleted"]'),
        continueButton: () => cy.get('[data-qa="continue-button"]')
    }

    verifyEnterAccountInfoVisible() {
        // Aguarda o formulário estar presente antes de verificar o título
        this.elements.signupForm().should('be.visible')
        
        // Verifica o título com o texto correto
        cy.contains('h2.title.text-center', 'Enter Account Information')
            .should('be.visible')
    }

    fillAccountInfo(userInfo) {
        // Aguarda o formulário estar visível e carregado antes de preencher
        this.elements.signupForm().should('be.visible')
        this.elements.password().should('be.visible')
        
        // Aguarda um pouco para o formulário estar completamente carregado
        cy.wait(1000)
        
        // Seleciona o título
        if (userInfo.title === 'Mr') {
            this.elements.titleMr().check({ force: true })
        } else {
            this.elements.titleMrs().check({ force: true })
        }

        // Preenche os dados básicos
        this.elements.password().type(userInfo.password)
        this.elements.days().select(userInfo.dateOfBirth.day)
        this.elements.months().select(userInfo.dateOfBirth.month)
        this.elements.years().select(userInfo.dateOfBirth.year)
        
        // Newsletter e ofertas especiais
        if (userInfo.newsletter) {
            this.elements.newsletter().check()
        }
        if (userInfo.specialOffers) {
            this.elements.specialOffers().check()
        }
    }

    fillAddressInfo(addressInfo) {
        this.elements.firstName().type(addressInfo.firstName)
        this.elements.lastName().type(addressInfo.lastName)
        this.elements.company().type(addressInfo.company)
        this.elements.address1().type(addressInfo.address1)
        this.elements.address2().type(addressInfo.address2)
        this.elements.country().select(addressInfo.country)
        this.elements.state().type(addressInfo.state)
        this.elements.city().type(addressInfo.city)
        this.elements.zipcode().type(addressInfo.zipcode)
        this.elements.mobileNumber().type(addressInfo.mobileNumber)
    }

    createAccount() {
        this.elements.createAccountButton().click()
    }

    verifyAccountCreated() {
        cy.contains('h2.title.text-center', 'Account Created!', { matchCase: false })
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim().toUpperCase()).to.equal('ACCOUNT CREATED!')
            })
    }

    verifyAccountDeleted() {
        cy.contains('h2.title.text-center', 'Account Deleted!', { matchCase: false })
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim().toUpperCase()).to.equal('ACCOUNT DELETED!')
            })
    }

    clickContinue() {
        this.elements.continueButton().should('be.visible').click()
    }
}

export default new SignupPage()