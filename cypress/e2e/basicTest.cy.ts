import type { Student } from '../../src/types/Student';

describe('The application ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });
  it('should show an input field and is able to filter after it', () => {
    cy.get('button').should('have.text', '+ New Student');
    cy.get('input[placeholder="Search students..."]').type('skelle');
    cy.get('td[data-testid="email"]').last().should('have.text', 'skelle0@mediafire.com');
  });

  it('should test the entire flow of the app', () => {
    const student: Omit<Student, 'id'> = {
      firstName: 'First',
      lastName: 'Last',
      email: 'first.last@example.com',
      mark: 8,
    };

    cy.get('button').click();
    cy.get('[data-testid="overlay"]').should('exist');

    cy.get('input[name="firstName"]').type(student.firstName);
    cy.get('input[name="lastName"]').type(student.lastName);
    cy.get('input[name="email"]').type(student.email);
    cy.get('input[name="mark"]').type(String(student.mark));
    cy.get('button[type="submit"]').click();
    cy.get('[data-testid="overlay"]').should('not.exist');

    cy.get('td[data-testid="email"]').last().should('have.text', student.email);
    cy.get('td[data-testid="email"]').last().click();
    cy.url().should('include', '/student/');
    cy.get('button[data-testid="edit"]').click();
    cy.url().should('include', '/edit');

    cy.get('input[name="firstName"]').type('edited');
    cy.get('button[type="submit"]').click();
    cy.get('td[data-testid="firstName"').should('have.text', 'Firstedited');

    cy.get('button[data-testid="delete"]').click();
    cy.get('[data-testid="overlay"]').should('exist');
    cy.get('button[data-testid="finaldelete"]').click();

    cy.url().should('eq', 'http://localhost:5173/');
    cy.get('td[data-testid="email"]').last().should('not.have.text', student.email);
  });
});
