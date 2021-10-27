import React from 'react';
import { mount } from '@cypress/react';
import WeightTracker from './WeightTracker';

import { formatDate } from '../utils/date';

it('displays the weight log modal when button is clicked', () => {
  cy.clearLocalStorage('weightHistory');

  mount(<WeightTracker />);

  cy.get('[data-testid="log-weight-button"]').click();
  cy.get('[data-testid="log-weight-dialog"]').should('be.visible');
  cy.get('[data-testid="log-weight-dialog-title"]').contains("Logging Weight Change");
});

it('adds a new log weight to the list and updates the current weight', () => {
  mount(<WeightTracker />);

  const randomWeight = Math.floor(Math.random() + 1 * 100); 

  cy.get('[data-testid="log-weight-button"]').click();

  cy.get('[data-testid="log-weight-dialog-date-input"] input').clear().type(formatDate(new Date()));
  cy.get('[data-testid="log-weight-dialog-weight-input"] input').type(randomWeight.toString());

  cy.get('[data-testid="log-weight-dialog-submit"]').click();

  cy.get('[data-testid="log-weight-dialog"]').should('have.length', 0);

  cy.get('[data-testid="current-weight"]').contains(`${randomWeight}kg`);
  cy.get('[data-testid="weight-history"]').contains(`${randomWeight}kg`);

  cy.get('[data-testid="DeleteIcon"]').click();
});

it('does not accept a date greater than today', () => {
  mount(<WeightTracker />);

  const randomWeight = Math.floor(Math.random() * 100);
  const dateInTheFuture = new Date();
  dateInTheFuture.setDate(dateInTheFuture.getDate() + 2);

  cy.get('[data-testid="log-weight-button"]').click();

  cy.get('[data-testid="log-weight-dialog-date-input"] input').clear().type(formatDate(dateInTheFuture));
  cy.get('[data-testid="log-weight-dialog-weight-input"] input').type(randomWeight.toString());

  cy.get('[data-testid="log-weight-dialog-submit"]').should('be.disabled');
  cy.get('[data-testid="log-weight-dialog-cancel"]').click();
});

it('can edit existing weight log', () => {
  mount(<WeightTracker />);

  const randomWeight = Math.floor(Math.random() * 100);
  const randomDate = new Date();
  randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));

  cy.get('[data-testid="log-weight-button"]').click();

  cy.get('[data-testid="log-weight-dialog-date-input"] input').clear().type(formatDate(randomDate));
  cy.get('[data-testid="log-weight-dialog-weight-input"] input').type(randomWeight.toString());

  cy.get('[data-testid="log-weight-dialog-submit"]').click();

  cy.get('[data-testid="EditIcon"]').click();

  cy.get('[data-testid="log-weight-dialog"]').should('be.visible');
  cy.get('[data-testid="log-weight-dialog-title"]').contains(`Update Weight Log from ${formatDate(randomDate)}`);

  const newRandomWeight = Math.floor(Math.random() * 100);

  cy.get('[data-testid="log-weight-dialog-weight-input"] input').clear().type(newRandomWeight.toString());
  
  cy.get('[data-testid="log-weight-dialog-submit"]').click();

  cy.get('[data-testid="weight-history"]').contains(`${newRandomWeight}kg`);

  cy.get('[data-testid="DeleteIcon"]').click();
});