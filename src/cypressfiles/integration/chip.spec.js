describe('Check Elements in items of Filters (select)', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.open-filters-button').click({ force: true });
  });

  it('Chip have a container-chip', () => {
    cy.get('.container-chip');
  });

  it('Container chip have a img', () => {
    cy.get('.icon-filter');
  });
})