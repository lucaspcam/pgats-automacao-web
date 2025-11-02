class LoginPage {
    elements = {
        // Login elements
        loginEmailInput: () => cy.get('input[data-qa="login-email"]'),
        loginPasswordInput: () => cy.get('input[data-qa="login-password"]'),
        loginButton: () => cy.get('button[data-qa="login-button"]'),
        loginForm: () => cy.get('.login-form'),
        loginTitle: () => cy.contains('h2', 'Login to your account'),
        
        // Signup elements
        signupNameInput: () => cy.get('input[data-qa="signup-name"]'),
        signupEmailInput: () => cy.get('input[data-qa="signup-email"]'),
        signupButton: () => cy.get('button[data-qa="signup-button"]'),
        signupForm: () => cy.get('.signup-form'),
        signupTitle: () => cy.contains('h2', 'New User Signup!'),
        
        // Error messages
        errorMessage: () => cy.get('p[style="color: red;"]')
    }

    verifyLoginPageVisible() {
        this.elements.loginTitle().should('be.visible')
        this.elements.loginForm().should('be.visible')
    }

    verifySignupPageVisible() {
        this.elements.signupTitle().should('be.visible')
        this.elements.signupForm().should('be.visible')
    }

    login(email, password) {
        this.verifyLoginPageVisible()
        this.elements.loginEmailInput().type(email)
        this.elements.loginPasswordInput().type(password)
        this.elements.loginButton().click()
    }

    signup(name, email) {
        this.verifySignupPageVisible()
        this.elements.signupNameInput().type(name)
        this.elements.signupEmailInput().type(email)
        this.elements.signupButton().click()
    }

    verifyLoginError(message) {
        this.elements.errorMessage().should('contain', message)
    }

    verifyLoginPageVisible() {
        this.elements.loginForm().should('be.visible')
        this.elements.loginTitle().should('be.visible').and('contain', 'Login to your account')
    }

    verifySignupPageVisible() {
        this.elements.signupForm().should('be.visible')
        this.elements.signupTitle().should('be.visible').and('contain', 'New User Signup!')
    }

    login(email, password) {
        this.verifyLoginPageVisible()
        this.elements.loginEmailInput().type(email)
        this.elements.loginPasswordInput().type(password)
        this.elements.loginButton().click()
    }

    signup(name, email) {
        this.verifySignupPageVisible()
        this.elements.signupNameInput().type(name)
        this.elements.signupEmailInput().type(email)
        this.elements.signupButton().click()
    }
}

export default new LoginPage()