

beforeEach(() => {
    cy.visit("/");
});

describe("lets hope the HTML is even there?", () => { // ✅
    it("should find the input box, and the button", () => {
        cy.get("#searchText").should("exist");
        cy.get("#search").should("exist");
    });
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

describe("Testing if it creates all elements as we expect it to", () => { // ✅
    it("Should create a div for each movie", () => {
        const searchString = "kung pow";
        cy.intercept("GET", "http://omdbapi.com/*", { fixture: "movieCall" }).as("moviesAPI");
        cy.get("#searchText").type(searchString).should("have.value", searchString);

        cy.get("#search").click();
        cy.get(".movie").should("exist");
    });
        it("Should create a h3 tag for each movie and have its title in it", () => {
        const searchString = "kung pow";
        cy.intercept("GET", "http://omdbapi.com/*", { fixture: "movieCall" }).as("moviesAPI");
        cy.get("#searchText").type(searchString).should("have.value", searchString);

        cy.get("#search").click();
        cy.get("h3:first").should("have.html", "kung pow");
        });
        it("Should create an img tag for each movie and have its title as an alt text", () => {
        const searchString = "kung pow";
        cy.intercept("GET", "http://omdbapi.com/*", { fixture: "movieCall" }).as("moviesAPI");
        cy.get("#searchText").type(searchString).should("have.value", searchString);

        cy.get("#search").click();
        cy.get("img:first").should("have.attr", "alt", "kung pow");
    });
});