import { circle, cssBorderColor, headCircle } from "./constants";

const testInput = ["1", null, "2", null, "3", null];

const testInputStack = [
  [{ item: "1", state: cssBorderColor.changing, head: "top" }],
  [{ item: "1", state: cssBorderColor.default, head: "top" }],

  [
    { item: "1", state: cssBorderColor.default, head: "" },
    { item: "2", state: cssBorderColor.changing, head: "top" },
  ],
  [
    { item: "1", state: cssBorderColor.default, head: "" },
    { item: "2", state: cssBorderColor.default, head: "top" },
  ],

  [
    { item: "1", state: cssBorderColor.default, head: "" },
    { item: "2", state: cssBorderColor.default, head: "" },
    { item: "3", state: cssBorderColor.changing, head: "top" },
  ],
  [
    { item: "1", state: cssBorderColor.default, head: "" },
    { item: "2", state: cssBorderColor.default, head: "" },
    { item: "3", state: cssBorderColor.default, head: "top" },
  ],
];
describe("Test component stack", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");
    cy.get('[data-cy="input"]').as("input");
    cy.get('[data-cy="button-add"]').as("button-add");
    cy.get('[data-cy="button-del"]').as("button-del");
    cy.get('[data-cy="button-clean"]').as("button-clean");
  });

  it("If input empty, then button disabled", () => {
    cy.get("@input").should("be.empty");
    cy.get("@button-add").should("be.disabled");
  });

  it("Elements are added correctly", () => {
    cy.clock();

    let lengthCicleArray = 0;
    testInputStack.forEach((step, indexStep) => {
      if (testInput[indexStep]) {
        cy.get("@input").type(testInput[indexStep]);
        cy.get("@button-add").should("be.enabled").click();
        lengthCicleArray++;
      }

      cy.get(circle)
        .should("have.length", lengthCicleArray)
        .each((el, index) => {
          cy.get(el).contains(step[index].item);
          cy.get(el).should("have.css", "border-color", step[index].state);
          cy.get(el).siblings(headCircle).should("have.text", step[index].head);
        });
      cy.tick(500);
    });

    cy.get("@button-del").should("be.enabled");
    cy.get("@button-clean").should("be.enabled");
  });

  it("Elements are deleted correctly", () => {
    cy.clock();

    testInput.forEach((item) => {
      if (item) {
        cy.get("@input").type(item);
        cy.get("@button-add").should("be.enabled").click();
        cy.tick(500);
      }
    });

    cy.get("@button-del").should("be.enabled").click();

    cy.tick(500);
    cy.get(circle).as("circles").should("have.length", 2);

    cy.get("@circles").then((item) => {
      cy.get(item[0]).contains("1");
      cy.get(item[0]).should(
        "have.css",
        "border-color",
        cssBorderColor.default
      );
      cy.get(item[0]).siblings(headCircle).should("have.text", "");
      cy.get(item[1]).contains("2");
      cy.get(item[1]).should(
        "have.css",
        "border-color",
        cssBorderColor.default
      );
      cy.get(item[1]).siblings(headCircle).should("have.text", "top");
    });

    cy.get("@button-add").should("be.disabled");
  });

  it("Button - Clean works correctly", () => {
    cy.clock();

    testInput.forEach((item) => {
      if (item) {
        cy.get("@input").type(item);
        cy.get("@button-add").should("be.enabled").click();
        cy.tick(500);
      }
    });

    cy.get("@button-clean").should("be.enabled").click();
    cy.get(circle).should("not.exist");
    cy.get("@button-add").should("be.disabled");
    cy.get("@button-del").should("be.disabled");
    cy.get("@button-clean").should("be.disabled");
  });
});
