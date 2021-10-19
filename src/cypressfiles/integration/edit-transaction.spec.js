describe('Testing editing a transaction', () => {
  beforeEach(() => {
    cy.intercept('GET',
      'http://localhost:3333/transactions',
      { fixture: 'transactions.json' }).as('loadTransactions');

    cy.visit('/');

    cy.get('.edit-icon').last().click({ force: true });
    cy.wait('@loadTransactions');
  });


  it('Change type of transaction debit to credit', () => {

    cy.get('#credit-button').click({ force: true });

    cy.get('input[name="value"]').clear().type(352500);
    cy.get('input[name="category"]').clear().type('Venda');
    cy.get('input[name="date"]').clear().type('15122021');
    cy.get('input[name="description"]').clear().type('Venda de um terreno');

    const selectedDate = new Date('12/15/2021');

    const data = {
      date: selectedDate,
      week_day: 'quarta',
      description: 'Venda de um terreno',
      value: 352500,
      category: 'Venda',
      type: 'credit'
    }

    cy.intercept({
      method: 'PUT',
      url: 'http://localhost:3333/transactions/2',
    }, (req) => {
      req.body.date = selectedDate;
      expect(req.body).to.deep.equal(data)
    });

    cy.get('.btn-insert').click({ force: true });

    cy.intercept('PUT', 'http://localhost:3333/transactions/2', { statusCode: 200 })

    cy.intercept('GET', 'http://localhost:3333/transactions', { statusCode: 200, fixture: 'transactions-after-edit-one.json' }).as('reloadTransaction');

    cy.wait('@reloadTransaction').then(() => {
      cy.visit('/');
      cy.get('.table-line').first()
        .should('contain', 'Venda')

      cy.get('.table-line').first()
        .should('contain', '352.500,00')

      cy.get('.table-line').first()
        .findByText('Venda de um terreno');

      cy.get('.table-line').first()
        .findByText('Quarta');

      cy.get('.in').contains('352.500,00');
      cy.get('.out').contains('0,00');
      cy.get('.balance').contains('352.500,00');
    });

  });

  it('Update transaction description', () => {

    cy.get('#credit-button').click({ force: true });

    cy.get('input[name="value"]').clear().type(352500);
    cy.get('input[name="category"]').clear().type('Venda');
    cy.get('input[name="date"]').clear().type('15122021');
    cy.get('input[name="description"]').clear().type('Venda de uma casa');

    const selectedDate = new Date('12/15/2021');

    const data = {
      date: selectedDate,
      week_day: 'quarta',
      description: 'Venda de uma casa',
      value: 352500,
      category: 'Venda',
      type: 'credit'
    }

    cy.intercept({
      method: 'PUT',
      url: 'http://localhost:3333/transactions/2',
    }, (req) => {
      req.body.date = selectedDate;
      expect(req.body).to.deep.equal(data)
    });

    cy.get('.btn-insert').click({ force: true });

    cy.intercept('PUT', 'http://localhost:3333/transactions/2', { statusCode: 200 })

    cy.intercept('GET', 'http://localhost:3333/transactions', { statusCode: 200, fixture: 'transactions-after-edit-two.json' }).as('reloadTransaction');

    cy.wait('@reloadTransaction').then(() => {
      cy.visit('/');
      cy.get('.table-line').first()
        .should('contain', 'Venda')

      cy.get('.table-line').first()
        .should('contain', '352.500,00')

      cy.get('.table-line').first()
        .findByText('Venda de uma casa');

      cy.get('.table-line').first()
        .findByText('Quarta');

      cy.get('.in').contains('352.500,00');
      cy.get('.out').contains('0,00');
      cy.get('.balance').contains('352.500,00');
    });
  });

  it('Transaction not update with incompleted fields', () => {

    cy.get('#credit-button').click({ force: true });

    cy.get('input[name="value"]').clear().type(352500);
    cy.get('input[name="category"]').clear();
    cy.get('input[name="date"]').clear().type('15122021');
    cy.get('input[name="description"]').clear().type('Venda de uma bicicleta');

    const selectedDate = new Date('12/15/2021');

    const data = {
      date: selectedDate,
      week_day: 'quarta',
      description: 'Venda de uma bicicleta',
      value: 352500,
      category: 'Venda',
      type: 'credit'
    }

    cy.intercept({
      method: 'PUT',
      url: 'http://localhost:3333/transactions/2',
    }, (req) => {
      req.body.date = selectedDate;
      expect(req.body).to.deep.equal(data)
    });

    cy.get('.btn-insert').click({ force: true });

    cy.intercept('PUT', 'http://localhost:3333/transactions/2', { statusCode: 200 })

    cy.findByText('Venda de um terreno').should('not.exist');;

  });

})