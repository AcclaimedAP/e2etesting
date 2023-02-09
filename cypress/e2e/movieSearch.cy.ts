

beforeEach(() => {
    cy.visit("/");
});

describe("Testing intended behavior on search", () => {
    it("API call should include correct movie call", () => {

        cy.intercept("GET", "http://omdbapi.com/*",{ fixture: "movieCall" }).as("moviesAPI");
        cy.get("#searchText").type("kung pow");

        cy.get("#search").click();
        cy.wait("@moviesAPI").its("request.url").should("contain", "kung%20pow");
    });
});