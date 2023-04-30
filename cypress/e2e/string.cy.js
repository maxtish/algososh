describe("Test component string", function () {
  before(function () {
    cy.visit("http://localhost:3000/recursion");
    cy.get('[data-cy="input"]').as("input");
    cy.get('[data-cy="button"]').as("button");
  });

  it("If input empty, then button disabled", function () {
    cy.get("@input").should("be.empty");
    cy.get("@button").should("be.disabled");
  });
});
