import {
  circle,
  cssBorderColor,
  headCircle,
  smallCircle,
  tailCircle,
} from "./constants";

describe("Test component queue", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
    cy.get('[data-cy="input-value"]').as("input-value");
    cy.get('[data-cy="input-index"]').as("input-index");
    cy.get('[data-cy="button-add-head"]').as("button-add-head");
    cy.get('[data-cy="button-add-tail"]').as("button-add-tail");
    cy.get('[data-cy="button-del-head"]').as("button-del-head");
    cy.get('[data-cy="button-del-tail"]').as("button-del-tail");
    cy.get('[data-cy="button-add-index"]').as("button-add-index");
    cy.get('[data-cy="button-del-index"]').as("button-del-index");
  });

  it("If input empty, then button disabled", () => {
    cy.get("@input-value").should("be.empty");
    cy.get("@button-add-head").should("be.disabled");
    cy.get("@button-add-tail").should("be.disabled");
    cy.get("@button-add-index").should("be.disabled");
    cy.get("@button-del-index").should("be.disabled");
  });

  it("The default list was displayed correctly", () => {
    cy.get(circle).as("circles");
    cy.get("@circles").should("have.length", 5);
    cy.get("@circles").first().siblings(headCircle).should("have.text", "head");
    cy.get("@circles").last().siblings(tailCircle).should("have.text", "tail");

    cy.get("@circles").each((el, index) => {
      cy.get(el)
        .siblings("[class*='circle_index']")
        .should("have.text", String(index));
    });
  });

  it("Adding an element to head is correct", () => {
    cy.get(circle).as("circles");

    cy.get("@input-value").type("1");
    cy.get("@button-add-head").should("be.enabled").click();
    cy.get("@input-value").should("be.empty");
    cy.get("@button-add-head").should("be.disabled");

    cy.get(smallCircle)
      .should("have.text", "1")
      .and("have.css", "border-color", cssBorderColor.changing);
    cy.wait(500);

    cy.get("@circles").should("have.length", 6);
    cy.get("@circles").first().as("circles-first");
    cy.get("@circles-first")
      .should("have.text", "1")
      .and("have.css", "border-color", cssBorderColor.modified);
    cy.wait(500);

    cy.get("@circles-first").should(
      "have.css",
      "border-color",
      cssBorderColor.default
    );
    cy.get("@circles-first").siblings(headCircle).should("have.text", "head");
  });

  it("Adding an element to tail is correct", () => {
    cy.get(circle).as("circles");

    cy.get("@input-value").type("1");
    cy.get("@button-add-tail").should("be.enabled").click();
    cy.get("@input-value").should("be.empty");
    cy.get("@button-add-tail").should("be.disabled");

    cy.get(smallCircle)
      .should("have.text", "1")
      .and("have.css", "border-color", cssBorderColor.changing);
    cy.wait(500);

    cy.get("@circles").should("have.length", 6);
    cy.get("@circles").last().as("circles-last");
    cy.get("@circles-last")
      .should("have.text", "1")
      .and("have.css", "border-color", cssBorderColor.modified);
    cy.wait(500);

    cy.get("@circles-last").should(
      "have.css",
      "border-color",
      cssBorderColor.default
    );
    cy.get("@circles-last").siblings(tailCircle).should("have.text", "tail");
  });

  it("Adding an element by index is correct", () => {
    cy.clock();
    const index = 2;
    cy.get(circle).as("circles");
    cy.get("@input-value").type("1");
    cy.get("@input-index").type(String(index));
    cy.get("@button-add-index").should("be.enabled").click();
    for (let i = 0; i <= index; i++) {
      cy.get("@circles")
        .eq(i)
        .should("have.text", "1")
        .and("have.css", "border-color", cssBorderColor.changing);
      cy.tick(1000);
    }
    cy.get("@circles")
      .eq(index)
      .should("have.text", "1")
      .and("have.css", "border-color", cssBorderColor.modified);
    cy.get("@circles").should("have.length", 6);
  });

  it("Deleting element from head correct", () => {
    cy.clock();
    cy.get(circle).as("circles");
    cy.get("@button-del-head").click();
    cy.get(smallCircle).should(
      "have.css",
      "border-color",
      cssBorderColor.changing
    );
    cy.get("@circles").eq(0).should("have.text", "");
    cy.tick(1000);
    cy.get("@circles")
      .first()
      .should("have.css", "border-color", cssBorderColor.default)
      .siblings(headCircle)
      .should("have.text", "head");
    cy.get("@circles").should("have.length", 4);
  });

  it("Deleting element from tail correct", () => {
    cy.clock();
    cy.get(circle).as("circles");
    cy.get("@button-del-tail").should("be.enabled").click();
    cy.get(smallCircle).and(
      "have.css",
      "border-color",
      cssBorderColor.changing
    );
    cy.get("@circles").eq(4).should("have.text", "");
    cy.tick(1000);
    cy.get("@circles")
      .last()
      .should("have.css", "border-color", cssBorderColor.default)
      .siblings(tailCircle)
      .should("have.text", "tail");
    cy.get("@circles").should("have.length", 4);
  });

  it("Deleting an item by index correct", () => {
    const index = 2;
    cy.get(circle).as("circles");
    cy.get("@input-index").type(String(index));
    cy.get("@button-del-index").should("be.enabled").click();
    for (let i = 0; i <= index; i++) {
      cy.wait(500);
      cy.get("@circles")
        .eq(i)
        .should("have.css", "border-color", cssBorderColor.changing);
    }
    cy.get("@circles")
      .eq(index)
      .should("have.text", "")
      .and("have.css", "border-color", cssBorderColor.changing);
    cy.get(smallCircle).should(
      "have.css",
      "border-color",
      cssBorderColor.changing
    );
    cy.wait(1000);
    cy.get("@circles").should("have.length", 4);
  });
});
