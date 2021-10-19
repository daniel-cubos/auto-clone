describe('Check elements in Modal Insert', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Modal Exists', () => {
    cy.get('.modal-container');
  });

  it('Check if exists backdrop', () => {
    cy.get('.backdrop')
      .should('have.css', 'background-color', "rgba(51, 51, 51, 0.83)");
  });

  it('Check if exists close icon', () => {
    cy.get('.close-icon');
  });

  it('Check if exists "Entrada" button', () => {
    cy.get('button').should('contain', 'Entrada');
  });

  it('Check if exists "Saída" button', () => {
    cy.get('button').should('contain', 'Saída');
  });

  it('Check if exists input "Valor"', () => {
    cy.get('input[name="value"]');
  });

  it('Check if exists input "Categoria"', () => {
    cy.get('input[name="category"]');
  });

  it('Check if exists input "Date"', () => {
    cy.get('input[name="date"]');
  });

  it('Check if exists input "Description"', () => {
    cy.get('input[name="description"]');
  });

  it('Check if exists btn-insert"', () => {
    cy.get('.btn-insert');
  });

  it('Check open and close modal', () => {

    cy.get('.btn-add').click({ force: true }).then(() => {

      cy.get('.close-icon').click();

      cy.get('.backdrop')
        .should('have.css', 'display', 'none');

    });
  });
})