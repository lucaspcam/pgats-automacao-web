class ContactUsPage {
    elements = {
        // Form fields
        name: () => cy.get('input[data-qa="name"]'),
        email: () => cy.get('input[data-qa="email"]'),
        subject: () => cy.get('input[data-qa="subject"]'),
        message: () => cy.get('textarea[data-qa="message"]'),
        uploadFile: () => cy.get('input[name="upload_file"]'),
        submitButton: () => cy.get('input[data-qa="submit-button"]'),
        
        // Page elements
        pageTitle: () => cy.get('.contact-form .title'),
        contactForm: () => cy.get('div.contact-form'),
        successMessage: () => cy.get('.status.alert.alert-success'),
        homeButton: () => cy.get('a.btn.btn-success')
    }

    verifyGetInTouchVisible() {
        // Aguarda a URL mudar para /contact_us
        cy.url().should('include', '/contact_us')
        
        // Aguarda o formulário estar visível primeiro
        this.elements.contactForm().should('be.visible')
        
        // Verifica o título com case insensitive e wait
        cy.wait(1000) // Aguarda um pouco para a página carregar completamente
        
        this.elements.pageTitle()
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim().toLowerCase()).to.include('get in touch')
            })
    }

    fillContactForm(contactInfo) {
        this.verifyGetInTouchVisible()
        this.elements.name().type(contactInfo.name)
        this.elements.email().type(contactInfo.email)
        this.elements.subject().type(contactInfo.subject)
        this.elements.message().type(contactInfo.message)
    }

    uploadFile(filePath) {
        this.elements.uploadFile().selectFile(filePath)
    }

    submitForm() {
        this.elements.submitButton().click()
    }

    verifySuccessMessage() {
        this.elements.successMessage()
            .should('be.visible')
            .and('contain', 'Success! Your details have been submitted successfully.')
    }

    clickHomeButton() {
        this.elements.homeButton().click()
    }
}

export default new ContactUsPage()