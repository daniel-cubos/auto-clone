describe('Check items in Confirm Delete', () => {
  before(() => {
    cy.intercept('GET',
      'http://localhost:3333/transactions',
      { fixture: 'transactions.json' }).as('loadTransactions');

    cy.visit('/');

    cy.wait('@loadTransactions');

    cy.get('.action-buttons img').last().click();
  });

  it('Confirm Delete have .container-confirm-delete', () => {
    cy.get('.container-confirm-delete');
  });

  it('Confirm Delete have a text "Apagar item"', () => {
    cy.findByText('Apagar item?');
  });

  it('Confirm Delete have .btn-actions-confirm-delete', () => {
    cy.get('.btn-actions-confirm-delete');
  });

  it('Confirm Delete have buttons "Sim" and "Não', () => {
    cy.findByText('Sim');
    cy.findByText('Não');
  });
})