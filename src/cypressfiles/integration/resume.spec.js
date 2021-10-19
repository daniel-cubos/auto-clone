describe('Check elements in Resume', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('check resume and elements in resume', () => {
    cy.get('.container-resume');
    cy.findByText('Resumo');
    cy.findByText('Entradas');
    cy.findByText('Saídas');
    cy.findByText('Saldo');
  });
})