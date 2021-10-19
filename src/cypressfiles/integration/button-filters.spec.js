describe('Check elements Button Filters', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Button Filters exists', () => {
    cy.get('.open-filters-button');
  });

  it('Button filters have word Filtrar', () => {
    cy.findByText('Filtrar');
  });
})