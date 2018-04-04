import React from 'react';
import {shallow, } from 'enzyme';
import '../../setupTests.js';
import About from './About';

describe('<About />', () => {
  it('Passes', () => {
    shallow(<About />);
  });
});
