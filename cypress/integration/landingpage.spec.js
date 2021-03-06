context('Landing Page', () => {

  describe('User is not logged in', () => {
    beforeEach(() => {
      indexedDB.deleteDatabase('firebaseLocalStorageDb');
      cy.visit('localhost:3000');
    });

    it('clicking on "Ich möchte Helfen" should redirect to overview', () => {
      cy.get('[data-cy=cta-want-to-help]').click();
      cy.hash().should('equal', '#/overview');
    });

    it('clicking on "Ich brauche Hilfe" should redirect to signup', () => {
      cy.get('[data-cy=cta-need-help]').click();
      cy.hash().should('equal', '#/signup/ask-for-help');
    });

    it('clicking on an entry should redirect to offer help', () => {
      cy.get('.entry').first().click();
      cy.hash().should('contain', '#/offer-help/');
    });
  });

  describe('User is logged in and his email address has been verified', () => {

    beforeEach(() => {
      cy.visit('localhost:3000');

      indexedDB.deleteDatabase('firebaseLocalStorageDb');

      cy.visit('localhost:3000/#/signin');
      cy.get('form input[type="email"]').type('florian.schmidt.1994@icloud.com{enter}');
      cy.get('form input[type="password"]').type('test1234{enter}');

      // TODO: Why do we redirect to ask-for-help here!
      cy.hash().should('equal', '#/ask-for-help');

      cy.visit('localhost:3000');
    });

    it('clicking on "Ich möchte Helfen" should redirect to overview', () => {
      cy.get('[data-cy=cta-want-to-help').click();
      cy.hash().should('equal', '#/overview');
    });

    it('clicking on "Ich brauche Hilfe" should redirect to signup', () => {
      cy.get('[data-cy=cta-need-help]').click();
      cy.hash().should('equal', '#/ask-for-help');
    });

    it('clicking on an entry should redirect to offer help', () => {
      cy.get('.entry').first().click();
      cy.hash().should('contain', '#/offer-help/');
    });

    it('clicking on "Meine Übersicht" should redirect to dashboard', () => {
      cy.get('[data-cy=nav-my-overview]').click();
      cy.hash().should('equal', '#/dashboard');
    });

    it('clicking on "Logout" should log out the user', () => {
      cy.server();
      cy.route('POST', 'https://www.googleapis.com/**').as('signOutUser');

      cy.get('[data-cy=btn-sign-out]').click();
      cy.get('[data-cy=btn-sign-out]').should('not.exist');
      cy.get('[data-cy=nav-my-overview]').should('not.exist');
    });
  });
});
