import React from 'react';
import { mount } from '@cypress/react';
import CurrentWeight from './CurrentWeight';
import { WeightLog } from '../interfaces/Weight';

it('renders the component without a weight log', () => {
  mount(<CurrentWeight weightLog={null} />);
  
  cy.get('span').contains('Your Current Weight');
  cy.get('div').contains('0.0kg');
});

it('displays the correct weight', () => {
  const weightLog: WeightLog = {
    weight: 20,
    date: new Date(),
  };

  mount(<CurrentWeight weightLog={weightLog} />);
  
  cy.get('span').contains('Your Current Weight');
  cy.get('div').contains('20kg');
});

it('displays the correct weight with decimals', () => {
  const weightLog: WeightLog = {
    weight: 35.51,
    date: new Date(),
  };

  mount(<CurrentWeight weightLog={weightLog} />);
  
  cy.get('span').contains('Your Current Weight');
  cy.get('div').contains('35.51kg');
});