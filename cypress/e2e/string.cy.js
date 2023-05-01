import { circle, cssBorderColor } from "./constants";

const testStepsReverse = [
  [
    { item: "1", state: cssBorderColor.changing },
    { item: "2", state: cssBorderColor.default },
    { item: "3", state: cssBorderColor.default },
    { item: "4", state: cssBorderColor.default },
    { item: "5", state: cssBorderColor.changing },
  ],
  [
    { item: "5", state: cssBorderColor.modified },
    { item: "2", state: cssBorderColor.changing },
    { item: "3", state: cssBorderColor.default },
    { item: "4", state: cssBorderColor.changing },
    { item: "1", state: cssBorderColor.modified },
  ],
  [
    { item: "5", state: cssBorderColor.modified },
    { item: "4", state: cssBorderColor.modified },
    { item: "3", state: cssBorderColor.changing },
    { item: "2", state: cssBorderColor.modified },
    { item: "1", state: cssBorderColor.modified },
  ],
  [
    { item: "5", state: cssBorderColor.modified },
    { item: "4", state: cssBorderColor.modified },
    { item: "3", state: cssBorderColor.modified },
    { item: "2", state: cssBorderColor.modified },
    { item: "1", state: cssBorderColor.modified },
  ],
];

describe("Test component string", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
    cy.get('[data-cy="input"]').as("input");
    cy.get('[data-cy="button"]').as("button");
  });

  it("If input empty, then button disabled", () => {
    cy.get("@input").should("be.empty");
    cy.get("@button").should("be.disabled");
  });

  it("Reverce of the string works correctly", () => {
    cy.clock();
    cy.get("@input").type("12345");
    cy.get("@button").should("be.enabled").click();

    testStepsReverse.forEach((step) => {
      cy.get(circle)
        .should("have.length", 5)
        .each((el, index) => {
          cy.get(el).contains(step[index].item);
          cy.get(el).should("have.css", "border-color", step[index].state);
        });
      cy.tick(1000);
    });
  });
});
