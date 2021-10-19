describe('Testing order registers in table', () => {
  beforeEach(() => {
    cy.intercept('GET',
      'http://localhost:3333/transactions',
      { fixture: 'transactions-order-by.json' }).as('loadTransactions');

    cy.visit('/');

    cy.wait('@loadTransactions');
  });

  it('Order by Date asc', () => {
    cy.get('.table-line').then(() => {
      cy.get('#date').click({ force: true });

      cy.get('.table-line').first().should('contain', '12/12/2021');
      cy.get('.table-line').first().should('contain', '500,00');
      cy.get('.table-line').first().findByText('Compra no mercado');
      cy.get('.table-line').first().findByText('Domingo');

      cy.get('.table-line').last().should('contain', '10/11/2021');
      cy.get('.table-line').last().should('contain', '32.500,00');
      cy.get('.table-line').last().findByText('Venda de um veículo');
      cy.get('.table-line').last().findByText('Quarta');
    })
  });

  it('Order by Date desc', () => {
    cy.get('.table-line').then(() => {
      cy.get('#date').click({ force: true });
      cy.get('#date').click({ force: true });

      cy.get('.table-line').first().should('contain', '10/11/2021');
      cy.get('.table-line').first().should('contain', '32.500,00');
      cy.get('.table-line').first().findByText('Venda de um veículo');
      cy.get('.table-line').first().findByText('Quarta');

      cy.get('.table-line').last().should('contain', '12/12/2021');
      cy.get('.table-line').last().should('contain', '500,00');
      cy.get('.table-line').last().findByText('Compra no mercado');
      cy.get('.table-line').last().findByText('Domingo');
    })
  });

  it('Order by week-day asc', () => {
    cy.get('.table-line').then(() => {
      cy.get('#week-day').click({ force: true });

      cy.get('.table-line').first().should('contain', '12/12/2021');
      cy.get('.table-line').first().should('contain', '500,00');
      cy.get('.table-line').first().findByText('Compra no mercado');
      cy.get('.table-line').first().findByText('Domingo');

      cy.get('.table-line').last().should('contain', '10/12/2021');
      cy.get('.table-line').last().should('contain', '152.500,00');
      cy.get('.table-line').last().findByText('Compra de um terreno');
      cy.get('.table-line').last().findByText('Sexta');
    })
  });

  it('Order by week-day desc', () => {
    cy.get('.table-line').then(() => {
      cy.get('#week-day').click({ force: true });
      cy.get('#week-day').click({ force: true });

      cy.get('.table-line').first().should('contain', '10/12/2021');
      cy.get('.table-line').first().should('contain', '152.500,00');
      cy.get('.table-line').first().findByText('Compra de um terreno');
      cy.get('.table-line').first().findByText('Sexta');

      cy.get('.table-line').last().should('contain', '12/12/2021');
      cy.get('.table-line').last().should('contain', '500,00');
      cy.get('.table-line').last().findByText('Compra no mercado');
      cy.get('.table-line').last().findByText('Domingo');
    })
  });

  it('Order by value asc', () => {
    cy.get('.table-line').then(() => {
      cy.get('#value').click({ force: true });

      cy.get('.table-line').first().should('contain', '12/12/2021');
      cy.get('.table-line').first().should('contain', '500,00');
      cy.get('.table-line').first().findByText('Compra no mercado');
      cy.get('.table-line').first().findByText('Domingo');

      cy.get('.table-line').last().should('contain', '10/12/2021');
      cy.get('.table-line').last().should('contain', '152.500,00');
      cy.get('.table-line').last().findByText('Compra de um terreno');
      cy.get('.table-line').last().findByText('Sexta');
    })
  });

  it('Order by value desc', () => {
    cy.get('.table-line').then(() => {
      cy.get('#value').click({ force: true });
      cy.get('#value').click({ force: true });

      cy.get('.table-line').first().should('contain', '10/12/2021');
      cy.get('.table-line').first().should('contain', '152.500,00');
      cy.get('.table-line').first().findByText('Compra de um terreno');
      cy.get('.table-line').first().findByText('Sexta');

      cy.get('.table-line').last().should('contain', '12/12/2021');
      cy.get('.table-line').last().should('contain', '500,00');
      cy.get('.table-line').last().findByText('Compra no mercado');
      cy.get('.table-line').last().findByText('Domingo');
    })
  });
})