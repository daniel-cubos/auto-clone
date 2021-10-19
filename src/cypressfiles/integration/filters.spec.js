describe('Check elements in Filters', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.open-filters-button').click({ force: true });
  });

  it('Filters have a container-filters', () => {
    cy.get('.container-filters');
  });

  it('Filters have elements to week days', () => {
    cy.findAllByText('Domingo');
    cy.findAllByText('Segunda');
    cy.findAllByText('Terça');
    cy.findAllByText('Quarta');
    cy.findAllByText('Quinta');
    cy.findAllByText('Sexta');
    cy.findAllByText('Sábado');
  });

  it('Filters have elements minValue', () => {
    cy.get('#min-value');
  });

  it('Filters have elements maxValue', () => {
    cy.get('#max-value');
  });

  it('Filters have a button to clean filters', () => {
    cy.findByText('Limpar filtros');
  });

  it('Filters have a button to clean filters', () => {
    cy.findByText('Aplicar filtros');
  });
})