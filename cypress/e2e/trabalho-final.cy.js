import HomePage from '../support/pageObjects/homePage'
import LoginPage from '../support/pageObjects/loginPage'
import SignupPage from '../support/pageObjects/signupPage'
import ProductsPage from '../support/pageObjects/productsPage'
import CartPage from '../support/pageObjects/cartPage'
import ContactUsPage from '../support/pageObjects/contactUsPage'
import { generateUserData, generateContactData, verifyPageUrl, handleAlert } from '../support/helpers'

describe('Automation Exercise Test Cases', () => {
    beforeEach(() => {
        // Launch browser and Navigate to url
        HomePage.navigateToHome()
        cy.viewport(1280, 720)
    })

    it('TC1: Register User', () => {
        const userData = generateUserData()

        // Verify home page is visible
        HomePage.verifyHomePageVisible()

        // Click on 'Signup / Login' button
        HomePage.clickSignupLogin()

        // Verify 'New User Signup!' is visible
        LoginPage.verifySignupPageVisible()

        // Enter name and email address
        LoginPage.signup(userData.name, userData.email)

        // Verify 'ENTER ACCOUNT INFORMATION' is visible
        SignupPage.verifyEnterAccountInfoVisible()

        // Fill details: Title, Name, Email, Password, Date of birth
        SignupPage.fillAccountInfo({
            ...userData,
            newsletter: true,
            specialOffers: true
        })

        // Fill address information
        SignupPage.fillAddressInfo(userData)

        // Click 'Create Account' button
        SignupPage.createAccount()

        // Verify that 'ACCOUNT CREATED!' is visible
        SignupPage.verifyAccountCreated()

        // Click 'Continue' button
        SignupPage.clickContinue()

        // Verify that 'Logged in as username' is visible
        HomePage.verifyLoggedInAs(userData.name)

        // Click 'Delete Account' button
        HomePage.clickDeleteAccount()

        // Verify 'ACCOUNT DELETED!' and click 'Continue' button
        SignupPage.verifyAccountDeleted()
        SignupPage.clickContinue()
    })

    it('TC2: Login User with correct email and password', () => {
        const userData = generateUserData()
        
        // Create new user first
        HomePage.clickSignupLogin()
        LoginPage.signup(userData.name, userData.email)
        SignupPage.fillAccountInfo(userData)
        SignupPage.fillAddressInfo(userData)
        SignupPage.createAccount()
        SignupPage.clickContinue()
        HomePage.clickLogout()
        
        // Verify home page is visible
        HomePage.verifyHomePageVisible()
        
        // Click on 'Signup / Login' button
        HomePage.clickSignupLogin()
        
        // Verify 'Login to your account' is visible
        LoginPage.verifyLoginPageVisible()
        
        // Enter correct email and password
        LoginPage.login(userData.email, userData.password)
        
        // Verify 'Logged in as username' is visible
        HomePage.verifyLoggedInAs(userData.name)
        
        // Click 'Delete Account' button
        HomePage.clickDeleteAccount()
        
        // Verify 'ACCOUNT DELETED!' is visible
        SignupPage.verifyAccountDeleted()
    })

    it('TC3: Login User with incorrect email and password', () => {
        // Verify home page is visible
        HomePage.verifyHomePageVisible()

        // Click on 'Signup / Login' button
        HomePage.clickSignupLogin()

        // Verify 'Login to your account' is visible
        LoginPage.verifyLoginPageVisible()

        // Enter incorrect email and password
        LoginPage.login('invalid@example.com', 'wrongpassword')

        // Verify error 'Your email or password is incorrect!' is visible
        LoginPage.verifyLoginError('Your email or password is incorrect!')
    })

    it('TC4: Logout User', () => {
        const userData = generateUserData()
        
        // Create and login with new user
        HomePage.clickSignupLogin()
        LoginPage.signup(userData.name, userData.email)
        SignupPage.fillAccountInfo(userData)
        SignupPage.fillAddressInfo(userData)
        SignupPage.createAccount()
        SignupPage.clickContinue()
        
        // Verify 'Logged in as username' is visible
        HomePage.verifyLoggedInAs(userData.name)
        
        // Click 'Logout' button
        HomePage.clickLogout()
        
        // Verify that user is navigated to login page
        LoginPage.verifyLoginPageVisible()
        
        // Cleanup: login and delete account
        LoginPage.login(userData.email, userData.password)
        HomePage.clickDeleteAccount()
    })

    it('TC5: Register User with existing email', () => {
        const userData = generateUserData()
        
        // Create a user first
        HomePage.clickSignupLogin()
        LoginPage.signup(userData.name, userData.email)
        SignupPage.fillAccountInfo(userData)
        SignupPage.fillAddressInfo(userData)
        SignupPage.createAccount()
        SignupPage.clickContinue()
        HomePage.clickLogout()
        
        // Verify home page is visible
        HomePage.verifyHomePageVisible()
        
        // Click on 'Signup / Login' button
        HomePage.clickSignupLogin()
        
        // Verify 'New User Signup!' is visible
        LoginPage.verifySignupPageVisible()
        
        // Enter name and already registered email address
        LoginPage.signup(userData.name, userData.email)
        
        // Verify error 'Email Address already exist!' is visible
        LoginPage.verifyLoginError('Email Address already exist!')
        
        // Cleanup: login and delete account
        LoginPage.login(userData.email, userData.password)
        HomePage.clickDeleteAccount()
    })

    it('TC6: Contact Us Form', () => {
        // Verify home page is visible
        HomePage.verifyHomePageVisible()

        // Click on 'Contact Us' button
        HomePage.clickContactUs()

        // Verify 'GET IN TOUCH' is visible
        ContactUsPage.verifyGetInTouchVisible()

        // Enter name, email, subject and message
        const contactData = generateContactData()
        ContactUsPage.fillContactForm(contactData)

        // Upload file
        ContactUsPage.uploadFile('cypress/fixtures/example.json')

        // Click Submit button
        ContactUsPage.submitForm()

        // Click OK button
        handleAlert(true)

        // Verify success message
        ContactUsPage.verifySuccessMessage()

        // Click 'Home' button and verify landing
        ContactUsPage.clickHomeButton()
        HomePage.verifyHomePageVisible()
    })

    it('TC8: Verify All Products and product detail page', () => {
        // Verify home page is visible
        HomePage.verifyHomePageVisible()

        // Click on 'Products' button
        HomePage.clickProducts()

        // Verify user is navigated to ALL PRODUCTS page successfully
        ProductsPage.verifyAllProductsPage()

        // Click on 'View Product' of first product
        ProductsPage.viewProductDetails(0)

        // Verify product detail is visible
        cy.url().should('include', '/product_details/')
        ProductsPage.verifyProductDetails()
    })

    it('TC9: Search Product', () => {
        // Verify home page is visible
        HomePage.verifyHomePageVisible()

        // Click on 'Products' button
        HomePage.clickProducts()

        // Verify user is navigated to ALL PRODUCTS page
        ProductsPage.verifyAllProductsPage()

        // Enter product name in search input and click search button
        const searchTerm = 'Blue Top'
        ProductsPage.searchProduct(searchTerm)

        // Verify 'SEARCHED PRODUCTS' is visible
        ProductsPage.verifySearchedProducts()

        // Verify all the products related to search are visible
        ProductsPage.verifySearchResults(searchTerm)
    })

    it('TC10: Verify Subscription in home page', () => {
        // Verify home page is visible
        HomePage.verifyHomePageVisible()
        
        // Scroll down to footer
        HomePage.elements.footer().scrollIntoView()
        
        // Verify text 'SUBSCRIPTION'
        HomePage.verifySubscriptionTitle()
        
        // Enter email address in input and click arrow button
        const email = generateUserData().email
        HomePage.subscribeNewsletter(email)
        
        // Verify success message
        HomePage.verifySubscriptionSuccess()
    })

    it('TC15: Place Order: Register before Checkout', () => {
        // Verify home page is visible
        HomePage.verifyHomePageVisible()

        // Click 'Signup / Login' button
        HomePage.clickSignupLogin()

        // Fill all details in Signup and create account
        const userData = generateUserData()
        LoginPage.signup(userData.name, userData.email)
        SignupPage.fillAccountInfo(userData)
        SignupPage.fillAddressInfo(userData)
        SignupPage.createAccount()

        // Verify 'ACCOUNT CREATED!' and click 'Continue' button
        SignupPage.verifyAccountCreated()
        SignupPage.clickContinue()

        // Verify 'Logged in as username' at top
        HomePage.verifyLoggedInAs(userData.name)

        // Add products to cart
        HomePage.clickProducts()
        HomePage.addToCart(0)
        HomePage.viewCart()

        // Verify that cart page is displayed
        verifyPageUrl('/view_cart')
        CartPage.verifyCartPage()

        // Click Proceed To Checkout
        CartPage.proceedToCheckout()

        // Verify Address Details and Review Your Order
        CartPage.verifyAddressDetailsAndReview()

        // Enter description in comment text area and click 'Place Order'
        CartPage.addComment('Test Order')
        CartPage.placeOrder()

        // Enter payment details and click 'Pay and Confirm Order'
        const paymentInfo = {
            nameOnCard: userData.name,
            cardNumber: '4242424242424242',
            cvc: '123',
            expiryMonth: '12',
            expiryYear: '2025'
        }
        CartPage.fillPaymentDetails(paymentInfo)
        CartPage.confirmPayment()

        // Verify success message
        CartPage.verifyOrderSuccess()

        // Click 'Delete Account' button
        HomePage.clickDeleteAccount()

        // Verify 'ACCOUNT DELETED!' and click 'Continue' button
        SignupPage.verifyAccountDeleted()
        SignupPage.clickContinue()
    })
})