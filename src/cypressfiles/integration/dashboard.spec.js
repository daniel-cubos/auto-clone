describe('Check items in Dashboard', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Dashboard have a Header', () => {
    cy.get('.container-header');
  });

  it('Dashboard have Resume Area', () => {
    cy.get('.container-resume');
  });

  it('Dashboard have Resume Filter Button', () => {
    cy.get('.open-filters-button');
  });

  it('Dashboard have transactions area', () => {
    cy.get('.table');
  });

  it('Dashboard have Button to add new register', () => {
    cy.get('.btn-add');
  });

  it('Dashboard have modal with backdrop', () => {
    cy.get('.backdrop');
    cy.get('.modal-container');
  });
})