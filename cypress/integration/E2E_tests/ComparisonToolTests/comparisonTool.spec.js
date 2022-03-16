/* eslint-disable cypress/no-unnecessary-waiting */
describe("On comparison page, can", () => {
  const now = new Date().toISOString().slice(0, 10)
  it("open the modal", () => {
    cy.login();
    cy.wait(2000);
    cy.fixture("url").then((jsonFile) => {
      cy.visit(
        `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.DASHBOARD}`
      );
    });
    cy.get("[data-cy=modal-activate]").click();
    cy.get("[data-cy=modal]").should("be.visible");
  });
  it("'To' and 'From' dates should be disabled", () => {
    cy.get("[data-cy=to]").should("be.disabled");
    cy.get("[data-cy=from]").should("be.disabled");
  });
  it("see the legend and radio buttons", () => {
    cy.get("[data-cy=legend]").should("have.length", 6);
    cy.get("[data-cy=radio-buttons]").should("have.length", 7);
  });
  it("select option", () => {
    cy.checkRadioButton('day');
  });
  it("select 'Custom'", () => {
    cy.checkRadioButton('custom');
    cy.get("[data-cy=to]").should("have.value", now);
    cy.get("[data-cy=from]").should("have.value", now);
  });
  it("enter custom 'From' date", () => {
    cy.setDate("from", "2022", "Feb", "10", "2022-02-10");
    cy.update();
    cy.get("[data-cy=to]").should("have.value", now);
  });
  it("cannot select a 'To' date that is before 'From'", () => {
    cy.get("[data-cy=to]").click();
    cy.get("[data-cy=date-picker-to]").contains("2022").click({ force: true });
    cy.get("[data-cy=date-picker-to]").contains("Jan").should("be.disabled");
    cy.get("[data-cy=date-picker-to]").contains("Feb").click({ force: true });
    cy.get("[data-cy=date-picker-to]").contains("9").should("be.disabled");
    cy.get("[data-cy=date-picker-to]").contains("10").click();
  });
  it("reset 'From' date and enter custom 'To' date", () => {
    cy.setDate("to", "2022", "Mar", "6", "2022-03-06");
    cy.get("[data-cy=from]").clear({ force: true });
    cy.update();
    cy.get("[data-cy=from]").should("have.value", "1900-01-01");
  });
});