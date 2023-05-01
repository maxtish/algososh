import { circle, cssBorderColor, headCircle, tailCircle } from "./constants";

const testInput = ["1", null, "2", null, "3", null];

const testInputQueue = [
  [{ item: "", state: cssBorderColor.changing, head: "", tail: "" }],

  [{ item: "1", state: cssBorderColor.default, head: "head", tail: "tail" }],

  [
    { item: "1", state: cssBorderColor.default, head: "head", tail: "tail" },
    { item: "", state: cssBorderColor.changing, head: "", tail: "" },
  ],

  [
    { item: "1", state: cssBorderColor.default, head: "head", tail: "" },
    { item: "2", state: cssBorderColor.default, head: "", tail: "tail" },
  ],
  [
    { item: "1", state: cssBorderColor.default, head: "head", tail: "" },
    { item: "2", state: cssBorderColor.default, head: "", tail: "tail" },
    { item: "", state: cssBorderColor.changing, head: "", tail: "" },
  ],
  [
    { item: "1", state: cssBorderColor.default, head: "head", tail: "" },
    { item: "2", state: cssBorderColor.default, head: "", tail: "" },
    { item: "3", state: cssBorderColor.default, head: "", tail: "tail" },
  ],
];

describe("Test component queue", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/queue");
    cy.get('[data-cy="input"]').as("input");
    cy.get('[data-cy="button-add"]').as("button-add");
    cy.get('[data-cy="button-del"]').as("button-del");
    cy.get('[data-cy="button-clean"]').as("button-clean");
  });

  it("If input empty, then button disabled", () => {
    cy.get("@input").should("be.empty");
    cy.get("@button-add").should("be.disabled");
  });

  it("Elements added correctly", () => {
    cy.clock();

    testInputQueue.forEach((step, indexStep) => {
      const length = step.length;
      if (testInput[indexStep]) {
        cy.get("@input").type(testInput[indexStep]);
        cy.get("@button-add").should("be.enabled").click();
      }

      cy.get(circle).each((el, index) => {
        if (index < length) {
          cy.get(el).should("have.text", step[index].item);
          cy.get(el).should("have.css", "border-color", step[index].state);
          cy.get(el).siblings(headCircle).should("have.text", step[index].head);
          cy.get(el).siblings(tailCircle).should("have.text", step[index].tail);
        }
      });
      cy.tick(500);
    });

    cy.get("@button-del").should("be.enabled");
    cy.get("@button-clean").should("be.enabled");
  });

  it("Element deleted correctly", () => {
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
    cy.get(circle).as("circles");

    cy.get("@circles").then((item) => {
      cy.get(item[1]).contains("2");
      cy.get(item[1]).should(
        "have.css",
        "border-color",
        cssBorderColor.default
      );
      cy.get(item[1]).siblings(headCircle).should("have.text", "head");
      cy.get(item[1]).siblings(tailCircle).should("have.text", "");
      cy.get(item[2]).contains("3");
      cy.get(item[2]).should(
        "have.css",
        "border-color",
        cssBorderColor.default
      );
      cy.get(item[2]).siblings(headCircle).should("have.text", "");
      cy.get(item[2]).siblings(tailCircle).should("have.text", "tail");
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
    cy.tick(500);

    cy.get(circle).each((el) => {
      cy.get(el).should("have.text", "");
      cy.get(el).should("have.css", "border-color", cssBorderColor.default);
      cy.get(el).siblings(headCircle).should("have.text", "");
      cy.get(el).siblings(tailCircle).should("have.text", "");
    });

    cy.get("@button-del").should("be.disabled");
    cy.get("@button-clean").should("be.disabled");
  });
});
