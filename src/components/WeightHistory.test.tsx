import React from 'react';
import { mount } from '@cypress/react';
import WeightHistory from './WeightHistory';
import { WeightLog } from '../interfaces/Weight';
import { formatDate } from '../utils/date';

it('renders weight logs correctly', () => {
  const weightLogs: WeightLog[] = [
    { weight: 100, date: new Date('2020-01-01') },
    { weight: 120, date: new Date('2021-01-01') },
    { weight: 125, date: new Date('2021-02-01') },
  ];

  mount(<WeightHistory weightHistory={weightLogs} />);

  cy.get('[data-testid="log-weight-card"]').should('have.length', 3);

  weightLogs.forEach((weightLog, index) => {
    cy.get('[data-testid="log-weight-card"]').eq(index).should('contain', formatDate(weightLog.date));
    cy.get('[data-testid="log-weight-card"]').eq(index).should('contain', `${weightLog.weight}kg`);
  });
});