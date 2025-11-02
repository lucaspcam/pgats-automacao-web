class ProductsPage {
    elements = {
        // Products list elements
        productsList: () => cy.get('.features_items'),
        allProductsTitle: () => cy.get('.features_items .title'),
        
        // Search elements
        searchInput: () => cy.get('#search_product'),
        searchButton: () => cy.get('#submit_search'),
        searchedProductsTitle: () => cy.get('.features_items .title'),
        
        // Product actions
        addToCartButtons: () => cy.get('.add-to-cart'),
        viewProductButtons: () => cy.get('.choose a'),
        
        // Product details
        productName: () => cy.get('.product-information h2'),
        productCategory: () => cy.get('.product-information p:contains("Category:")'),
        productPrice: () => cy.get('.product-information span span'),
        productAvailability: () => cy.get('.product-information p:contains("Availability:")'),
        productCondition: () => cy.get('.product-information p:contains("Condition:")'),
        productBrand: () => cy.get('.product-information p:contains("Brand:")')
    }

    searchProduct(productName) {
        this.elements.searchInput().type(productName)
        this.elements.searchButton().click()
    }

    addProductToCart(productIndex) {
        this.elements.addToCartButtons().eq(productIndex).click()
    }

    viewProductDetails(productIndex) {
        this.elements.viewProductButtons().eq(productIndex).click()
    }

    verifyProductsListVisible() {
        this.elements.productsList().should('be.visible')
    }

    verifyProductName(name) {
        this.elements.productName().should('have.text', name)
    }

    searchProduct(productName) {
        this.elements.searchInput().type(productName)
        this.elements.searchButton().click()
    }

    viewProductDetails(productIndex) {
        this.elements.viewProductButtons().eq(productIndex).click()
    }

    verifyProductDetails() {
        this.elements.productName().should('be.visible')
        this.elements.productCategory().should('be.visible')
        this.elements.productPrice().should('be.visible')
        this.elements.productAvailability().should('be.visible')
        this.elements.productCondition().should('be.visible')
        this.elements.productBrand().should('be.visible')
    }

    verifyAllProductsPage() {
        // Aguarda a URL mudar
        cy.url().should('include', '/products')
        
        // Aguarda a lista de produtos estar visível
        this.elements.productsList().should('be.visible')
        
        // Verifica o título
        cy.wait(1000) // Aguarda um pouco para o título carregar
        this.elements.allProductsTitle()
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim().toUpperCase()).to.include('ALL PRODUCTS')
            })
    }

    verifySearchedProducts() {
        this.elements.productsList().should('be.visible')
        this.elements.searchedProductsTitle()
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim().toUpperCase()).to.include('SEARCHED PRODUCTS')
            })
    }

    verifySearchResults(searchTerm) {
        this.elements.productsList()
            .should('be.visible')
            .and('contain', searchTerm)
    }
}

export default new ProductsPage()