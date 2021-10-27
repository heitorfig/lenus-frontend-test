import React from 'react';
import { mount } from '@cypress/react';
import WeightLogItem from './WeightLogItem';
import { WeightLog } from '../interfaces/Weight';
import { formatDate } from '../utils/date';

it('renders weight log correctly', () => {
  const weightLog: WeightLog = {
    weight: 100, date: new Date('2020-01-01')
  };

  mount(<WeightLogItem weightLog={weightLog} />);

  cy.get('.MuiCard-root').contains(formatDate(weightLog.date));
  cy.get('.MuiCard-root').contains(`${weightLog.weight}kg`);
});

it('renders weight log with decimal weight', () => {
  const weightLog: WeightLog = {
    weight: 110.55, date: new Date('2020-01-01')
  };

  mount(<WeightLogItem weightLog={weightLog} />);

  cy.get('.MuiCard-root').contains(formatDate(weightLog.date));
  cy.get('.MuiCard-root').contains(`${weightLog.weight}kg`);
});

it('displays the edit button when onEditClick is passed', () => {
  const weightLog: WeightLog = {
    weight: 110.55, date: new Date('2020-01-01')
  };
  const onEditClick = () => { };

  mount(<WeightLogItem weightLog={weightLog} onEditClick={onEditClick} />);

  cy.get('[data-testid="EditIcon"]').should('be.visible');
});

it('displays the delete button when onDeleteClick is passed', () => {
  const weightLog: WeightLog = {
    weight: 110.55, date: new Date('2020-01-01')
  };
  const onDeleteClick = () => { };

  mount(<WeightLogItem weightLog={weightLog} onDeleteClick={onDeleteClick} />);

  cy.get('[data-testid="DeleteIcon"]').should('be.visible');
});