

beforeEach(() => {
    cy.visit("/");
});


describe("Testing intended behavior on search", () => { // ✅
    it("API call should include correct movie call", () => {
        const searchString = "kung pow";
        cy.intercept("GET", "http://omdbapi.com/*", { fixture: "movieCall" }).as("moviesAPI");
        cy.get("#searchText").type(searchString).should("have.value", searchString);

        cy.get("#search").click();
        cy.wait("@moviesAPI").its("request.url").should("contain", "kung%20pow");

        cy.get("h3:first").should("contain.text", "kung pow");
    });
});