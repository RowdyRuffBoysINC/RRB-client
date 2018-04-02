import React from 'react';
import {shallow,} from 'enzyme';
import '../setupTests.js';
import {LandingPage,} from './Landing-Page';

describe('<LandingPage />', () => {
  it('Passes', () => {
    shallow(<LandingPage />);
  });
})
;
