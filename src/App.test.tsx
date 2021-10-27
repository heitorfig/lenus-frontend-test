import React from 'react';
import { mount } from '@cypress/react';
import App from './App';

it('displays the app title', () => {
  mount(<App />);
  cy.get('h1').contains('Weight Tracker');
});

it('displays the current weight component', () => {
  mount(<App />);
  cy.get('main').contains('Your Current Weight');
  cy.get('main').contains('0.0kg');
});

it('displays the Log Your Weight button', () => {
  mount(<App />);
  cy.get('button').contains('Log Your Weight');
});