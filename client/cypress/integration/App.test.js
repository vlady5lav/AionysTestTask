describe('End-2-End Test', () => {
  it('should enter the site', () => {
    cy.visit('http://localhost:3050/');
    cy.url().should('include', '/notes');
  });
  it('should switch a language', () => {
    cy.get('.langSwitcher').first().contains('RU');
    cy.get('.langSwitcher').click();
    cy.get('.langSwitcher').first().contains('EN');
  });
  it('should get a notes', () => {
    cy.visit('http://localhost:3050/');
    cy.get('.noteCard').should('have.length', 16);
  });
  it('should open a note editor', () => {
    cy.visit('http://localhost:3050/');
    cy.get('.editNoteButton').first().click();
    cy.url().should('include', '/notes/edit/');
  });
  it('should open a note details', () => {
    cy.visit('http://localhost:3050/');
    cy.get('.goToNoteButton').last().click();
    cy.url().should('include', '/notes/16');
  });
  it('should open a note creator', () => {
    cy.visit('http://localhost:3050/');
    cy.get('.createNoteButton').first().click();
    cy.url().should('include', '/notes/create');
  });
  it('should save a note after edit', () => {
    cy.visit('http://localhost:3050/');
    cy.get('.editNoteButton').first().click();
    cy.url().should('include', '/notes/edit/');
    cy.get('form').submit();
    cy.get('.noteCard');
  });
  it('should delete a note', () => {
    cy.visit('http://localhost:3050/');
    cy.get('.noteCard').should('have.length', 16);
    cy.get('.deleteNoteButton').first().click();
    cy.get('.noteCard').should('have.length', 15);
  });
  it('should create a note', () => {
    cy.visit('http://localhost:3050/notes/create');
    cy.get('input').first().type('New Test Note');
    cy.get('form').submit();
    cy.get('.noteCard').contains('New Test Note');
  });
});
