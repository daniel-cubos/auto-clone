describe('Check elements in Header', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('check header Exists', () => {
    cy.get('.container-header');
  });

  it('Logo exists in Header', () => {
    cy.get('.container-header img');
  });
})