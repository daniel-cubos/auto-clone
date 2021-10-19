describe('Testing delete registers', () => {
  before(() => {
    cy.intercept('GET',
      'http://localhost:3333/transactions',
      { fixture: 'transactions.json' }).as('loadTransactions');

    cy.visit('/');

    cy.wait('@loadTransactions');
  });

  it('Delete first item', () => {
    cy.get('.delete-icon').first().click({ force: true });

    cy.findByText('Sim').click();

    cy.intercept('DELETE', 'http://localhost:3333/transactions/1', { statusCode: 200 }).as('deleteTransaction');
    cy.wait('@deleteTransaction');

    cy.intercept('GET', 'http://localhost:3333/transactions', { statusCode: 200, fixture: 'transactions-after-delete-one.json' }).as('reloadTransaction');

    cy.wait('@reloadTransaction').then(() => {
      cy.visit('/');

      cy.get('.table-line').should('contain', 'Compras')

      cy.get('.table-line').should('contain', '152.500,00')

      cy.get('.table-line').findByText('Compra de um terreno');

      cy.get('.table-line').findByText('Sexta');

      cy.get('.in').contains('0,00');
      cy.get('.out').contains('152.500,00');
      cy.get('.balance').contains('152.500,00');
    });
  });

  it('Delete second item', () => {
    cy.get('.delete-icon').last().click({ force: true });

    cy.findByText('Sim').click();

    cy.intercept('DELETE', 'http://localhost:3333/transactions/2', { statusCode: 200 }).as('deleteTransaction');
    cy.wait('@deleteTransaction');

    cy.intercept('GET', 'http://localhost:3333/transactions', { statusCode: 200, fixture: 'transactions-after-delete-two.json' }).as('reloadTransaction');

    cy.wait('@reloadTransaction').then(() => {
      cy.visit('/');

      cy.get('.table-line').should('contain', 'Vendas')

      cy.get('.table-line').should('contain', '32.500,00')

      cy.get('.table-line').findByText('Venda de um veículo');

      cy.get('.table-line').findByText('Segunda');

      cy.get('.in').contains('32.500,00');
      cy.get('.out').contains('43.500,00');
      cy.get('.balance').contains('11.000,00');
    });
  });

  it('Not confirm to delete item', () => {
    cy.get('.delete-icon').first().click({ force: true });

    cy.findByText('Não').click();

    cy.get('.table-line').first().should('contain', 'Vendas')

    cy.get('.table-line').first().should('contain', '32.500,00')

    cy.get('.table-line').first().findByText('Venda de um veículo');

    cy.get('.table-line').first().findByText('Segunda');

    cy.get('.in').contains('32.500,00');
    cy.get('.out').contains('43.500,00');
    cy.get('.balance').contains('11.000,00');
  });
})