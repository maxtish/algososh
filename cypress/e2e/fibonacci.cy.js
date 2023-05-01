const testStepsFibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

describe("Test component fibonacci", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/fibonacci");
    cy.get('[data-cy="input"]').as("input");
    cy.get('[data-cy="button"]').as("button");
  });

  it("If input empty, then button disabled", () => {
    cy.get("@input").should("be.empty");
    cy.get("@button").should("be.disabled");
  });

  it("The numbers generated correctly", () => {
    cy.get("@input").type(testStepsFibonacci.length - 1);
    cy.get("@button").should("be.enabled").click();
    cy.wait(testStepsFibonacci.length * 500);
    cy.get("[class^='circle_circle']").each((el, index) => {
      cy.get(el).contains(testStepsFibonacci[index]);
    });
  });
});
