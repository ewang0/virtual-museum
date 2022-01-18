import { shouldForwardProp } from "@mui/styled-engine"

describe('Home', () => {
    beforeEach(() => {
        cy.intercept('GET', `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=sunflower`, {
            statusCode: 200,
            body: {
                objectIDs: [
                    363282,
                    11922,
                    360837
                ]
            }
        })
        cy.visit('http://localhost:3000')
    })

    it('Should display navigation', () => {
        cy.get('nav').should('be.visible')
        cy.get('nav').contains('METVIRTUAL')
            .get('nav').contains('Home')
            .get('nav').contains('About')
            .get('nav').contains('Saved')
    })

    it('Should display a description of the app in the sidebar', () => {
        cy.get('nav').contains('Search the collection of the Metropolitan Museum of Art and get inspired without leaving home.')
    })

    it('Should display a search bar', () => {
        cy.get('.search').should('be.visible')
    })

    it('Should display search filters', () => {
        cy.get('.search-filter-container').should('exist')
        cy.get('.search-filter-container').should('be.visible')
    })

    it('Should allow a user to search for images', () => {
        cy.get('.search').type('Sir Anthony Van Dyck with a sunflower')
        cy.get('.submit-search-button').click()
        cy.get('.images').should('be.visible')
    })

    it('Should display an ImageGrid with 3 images', () => {
        cy.get('.image-grid-section-container').should('be.visible')
        cy.get('.images').should('be.visible')
        cy.get('img').should('have.length', 3)
        //sometimes only two images loaded when testing
    })

    it('Should display a Details page when an image is clicked', () => {
        cy.get('img').first().click()
        cy.get('.details-section-container').should('be.visible')
        cy.get('.carousel-container').children().should('be.visible')
        cy.get('.object-details-content').should('be.visible')
    })

    it('Should display information about the image when hovering over it', () => {
        cy.get('img').first().trigger('mouseover')
        cy.get('.aside-content').should('be.visible')
    })

    it('Should display an option to sort by department', () => {
        cy.get('.autocomplete').should('be.visible')
    })

    it('Should display a 404 page when a bad URL is visited', () => {
        cy.visit('http://localhost:3000/potato')
        cy.get('.error-state-content').contains('404 Not Found')
    })
})
