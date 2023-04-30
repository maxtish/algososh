describe("app works correctly with routes", function () {
  before(function () {
    cy.visit("http://localhost:3000/");
  });

  it("Should open main page", function () {
    cy.contains("МБОУ АЛГОСОШ");
  });

  it("Should open page recursion", () => {
    cy.visit("http://localhost:3000/recursion");
    cy.contains("Строка");
  });

  it("Should open page fibonacci", () => {
    cy.visit("http://localhost:3000/fibonacci");
    cy.contains("Последовательность Фибоначчи");
  });

  it("Should open page sorting", () => {
    cy.visit("http://localhost:3000/sorting");
    cy.contains("Сортировка массива");
  });

  it("Should open page stack", () => {
    cy.visit("http://localhost:3000/stack");
    cy.contains("Стек");
  });

  it("Should open page queue", () => {
    cy.visit("http://localhost:3000/queue");
    cy.contains("Очередь");
  });

  it("Should open page list", () => {
    cy.visit("http://localhost:3000/list");
    cy.contains("Связный список");
  });
});
