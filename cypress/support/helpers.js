import { faker } from '@faker-js/faker'

export function getRandomNumber() {
  return faker.number.bigInt()
}

export function getRandomEmail() {
  return faker.internet.email({ firstName: 'QATesterPgats' })
}

// Generate random user data for registration
export function generateUserData() {
  return {
    name: faker.person.fullName(),
    email: getRandomEmail(),
    title: faker.helpers.arrayElement(['Mr', 'Mrs']),
    password: faker.internet.password(),
    dateOfBirth: {
      day: faker.number.int({ min: 1, max: 28 }).toString(),
      month: faker.number.int({ min: 1, max: 12 }).toString(),
      year: faker.number.int({ min: 1950, max: 2000 }).toString()
    },
    newsletter: faker.datatype.boolean(),
    specialOffers: faker.datatype.boolean(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: 'United States',
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobileNumber: faker.phone.number()
  }
}

// Generate contact form data
export function generateContactData() {
  return {
    name: faker.person.fullName(),
    email: getRandomEmail(),
    subject: faker.lorem.sentence(),
    message: faker.lorem.paragraph()
  }
}

// Wait for navigation and verify URL
export function verifyPageUrl(path) {
  cy.url().should('include', path)
}

// Handle alerts
export function handleAlert(accept = true) {
  cy.on('window:alert', () => true)
  cy.on('window:confirm', () => accept)
}