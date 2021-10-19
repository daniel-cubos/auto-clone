describe('Check elements in Table', () => {
  before(() => {
    cy.intercept('GET',
      'http://localhost:3333/transactions',
      { fixture: 'transactions.json' }).as('loadTransactions');

    cy.visit('/');

    cy.wait('@loadTransactions');
  });

  it('Verify header of table', () => {
    cy.get('.table-head').children().should('have.length', 6);
  });

  it('Verify name of columns', () => {
    cy.get('.column-title').children().should('contain', 'Data');
    cy.get('.column-title').children().should('contain', 'Dia da semana');
    cy.get('.column-title').children().should('contain', 'Descrição');
    cy.get('.column-title').children().should('contain', 'Categoria');
    cy.get('.column-title').children().should('contain', 'Valor');
  });

  it('Verify if exists table-line', () => {
    cy.get('.table-line');
  });

  it('Verify items in first table-line', () => {
    cy.get('.table-line').first().children('.line-items').should('have.length', 6);
  });

  it('Verify if existis edit icon', () => {
    cy.get('.edit-icon');
  });

  it('Verify if existis delete icon', () => {
    cy.get('.delete-icon');
  });
})