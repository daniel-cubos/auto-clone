describe('Testing apply filters in table', () => {
  beforeEach(() => {
    cy.intercept('GET',
      'http://localhost:3333/transactions',
      { fixture: 'transactions-order-by.json' }).as('loadTransactions');

    cy.visit('/');

    cy.wait('@loadTransactions');
  });

  it('Apply filters in monday and wednesday', () => {

    cy.get('.open-filters-button').click().then(() => {

      cy.get('.container-chip').eq(0).click({ multiple: true });
      cy.get('.container-chip').eq(3).click({ multiple: true });

      cy.get('.btn-apply-filters').click();

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

  it('Apply filters in monday and wednesday and category "Vendas"', () => {

    cy.get('.open-filters-button').click().then(() => {

      cy.get('.container-chip').eq(0).click();
      cy.get('.container-chip').eq(3).click();

      cy.get('.container-chip').eq(7).click();

      cy.get('.btn-apply-filters').click();

      cy.get('.table-line').first().should('contain', '10/11/2021');
      cy.get('.table-line').first().should('contain', 'Quarta');
      cy.get('.table-line').first().should('contain', '32.500,00');
      cy.get('.table-line').first().findByText('Venda de um veículo');
    })
  });


  it('Apply filters with min and max value', () => {

    cy.get('.open-filters-button').click().then(() => {

      cy.get('#min-value').clear().type(1000);
      cy.get('#max-value').clear().type(30000);

      cy.get('.btn-apply-filters').click();

      cy.get('.table-line').should('not.exist');
    })
  });

  it('Apply filters only max value', () => {

    cy.get('.open-filters-button').click().then(() => {

      cy.get('#max-value').clear().type(30000);

      cy.get('.btn-apply-filters').click();

      cy.get('.table-line').first().should('contain', '12/12/2021');
      cy.get('.table-line').first().should('contain', 'Domingo');
      cy.get('.table-line').first().should('contain', '500,00');
      cy.get('.table-line').first().findByText('Compra no mercado');
      cy.get('.table-line').first().findByText('Compras');
    })
  });


  it('Apply filters in monday and wednesday, category "Vendas", min and max value', () => {

    cy.get('.open-filters-button').click().then(() => {

      cy.get('.container-chip').eq(0).click();
      cy.get('.container-chip').eq(5).click();

      cy.get('.container-chip').eq(8).click();

      cy.get('#min-value').clear().type(1000);
      cy.get('#max-value').clear().type(153000);

      cy.get('.btn-apply-filters').click();

      cy.get('.table-line').first().should('contain', '10/12/2021');
      cy.get('.table-line').first().should('contain', 'Sexta');
      cy.get('.table-line').first().should('contain', '152.500,00');
      cy.get('.table-line').first().findByText('Compra de um terreno');
      cy.get('.table-line').first().findByText('Compras');
    })
  });

  it('Select filters then clear filters', () => {

    cy.get('.open-filters-button').click().then(() => {

      cy.get('.container-chip').eq(0).click();
      cy.get('.container-chip').eq(5).click();

      cy.get('.container-chip').eq(8).click();

      cy.get('#min-value').clear().type(1000);
      cy.get('#max-value').clear().type(153000);

      cy.get('.btn-apply-filters').click().then(() => {
        cy.get('.table-line').first().should('contain', '10/12/2021');
        cy.get('.table-line').first().should('contain', 'Sexta');
        cy.get('.table-line').first().should('contain', '152.500,00');
        cy.get('.table-line').first().findByText('Compra de um terreno');
        cy.get('.table-line').first().findByText('Compras');
      });

      cy.get('.btn-clear-filters').click().then(() => {
        cy.get('.table-line').first().should('contain', '10/11/2021');
        cy.get('.table-line').first().should('contain', '32.500,00');
        cy.get('.table-line').first().findByText('Venda de um veículo');
        cy.get('.table-line').first().findByText('Quarta');

        cy.get('.table-line').last().should('contain', '12/12/2021');
        cy.get('.table-line').last().should('contain', '500,00');
        cy.get('.table-line').last().findByText('Compra no mercado');
        cy.get('.table-line').last().findByText('Domingo');
      });
    })
  });



})