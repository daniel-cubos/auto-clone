
describe('Testing insert new register', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.btn-add').click({ force: true });
  });


  it('Create new debit register', () => {

    cy.get('input[name="value"]').type(32500);
    cy.get('input[name="category"]').type('Compras');
    cy.get('input[name="date"]').type('11102021');
    cy.get('input[name="description"]').type('Compra de um veículo');

    const selectedDate = new Date('10/11/2021');

    const data = {
      date: selectedDate,
      week_day: 'segunda',
      description: 'Compra de um veículo',
      value: 32500,
      category: 'Compras',
      type: 'debit'
    }

    cy.intercept({
      method: 'POST',
      url: 'http://localhost:3333/transactions',
    }, (req) => {
      req.body.date = selectedDate;
      expect(req.body).to.deep.equal(data)
    });

    cy.get('.btn-insert').click({ force: true });

    cy.intercept('POST', 'http://localhost:3333/transactions', { statusCode: 204 });

    cy.intercept('GET', 'http://localhost:3333/transactions', { statusCode: 200, fixture: 'transactions-insert-one.json' }).as('reloadTransaction');

    cy.wait('@reloadTransaction').then(() => {
      cy.visit('/');
      cy.get('.table-line').first()
        .should('contain', 'Compras')

      cy.get('.table-line').first()
        .should('contain', '32.500,00')

      cy.get('.table-line').first()
        .findByText('Compra de um veículo');

      cy.get('.table-line').first()
        .findByText('Segunda');

    });

  });

  it('Create new credit register', () => {

    cy.get('#credit-button').click({ force: true });

    cy.get('input[name="value"]').type(15500);
    cy.get('input[name="category"]').type('Salário');
    cy.get('input[name="date"]').type('07102021');
    cy.get('input[name="description"]').type('Trabalho para empresa.');

    const selectedDate = new Date('10/07/2021');

    const data = {
      date: selectedDate,
      week_day: 'quinta',
      description: 'Trabalho para empresa.',
      value: 15500,
      category: 'Salário',
      type: 'credit'
    }

    cy.intercept({
      method: 'POST',
      url: 'http://localhost:3333/transactions',
    }, (req) => {
      req.body.date = selectedDate;
      expect(req.body).to.deep.equal(data)
    });

    cy.get('.btn-insert').click({ force: true });

    cy.intercept('POST', 'http://localhost:3333/transactions', { statusCode: 201 });

    cy.intercept('GET', 'http://localhost:3333/transactions', { statusCode: 200, fixture: 'transactions-insert-two.json' }).as('reloadTransaction');

    cy.wait('@reloadTransaction').then(() => {
      cy.visit('/');
      cy.get('.table-line').first()
        .should('contain', 'Salário')

      cy.get('.table-line').first()
        .should('contain', '15.500,00')

      cy.get('.table-line').first()
        .findByText('Trabalho para empresa.');

      cy.get('.table-line').first()
        .findByText('Quinta');

    });

  });


  it('Not create register with incompleted fields', () => {

    cy.get('#credit-button').click({ force: true });
    cy.get('input[name="value"]').type(15500);
    cy.get('input[name="category"]').type('Salário');
    cy.get('input[name="date"]').type('07102021');

    const selectedDate = new Date('10/07/2021');

    const data = {
      date: selectedDate,
      week_day: 'quinta',
      value: 15500,
      category: 'Salário',
      type: 'credit'
    }

    cy.intercept({
      method: 'POST',
      url: 'http://localhost:3333/transactions',
    }, (req) => {
      req.body.date = selectedDate;
      expect(req.body).to.deep.equal(data)
    });

    cy.get('.btn-insert').click({ force: true });

    cy.intercept('POST', 'http://localhost:3333/transactions', { statusCode: 201 });

    cy.get('.table-line').should('not.exist');

  });

  it('Not create register with text in value field', () => {

    cy.get('#credit-button').click({ force: true });
    cy.get('input[name="value"]').type("name");
    cy.get('input[name="category"]').type('Salário');
    cy.get('input[name="date"]').type('07102021');

    const selectedDate = new Date('10/07/2021');

    const data = {
      date: selectedDate,
      week_day: 'quinta',
      value: 'name',
      category: 'Salário',
      type: 'credit'
    }

    cy.intercept({
      method: 'POST',
      url: 'http://localhost:3333/transactions',
    }, (req) => {
      req.body.date = selectedDate;
      expect(req.body).to.deep.equal(data)
    });

    cy.get('.btn-insert').click({ force: true });

    cy.intercept('POST', 'http://localhost:3333/transactions', { statusCode: 201 });

    cy.get('.table-line').should('not.exist');

  });

})