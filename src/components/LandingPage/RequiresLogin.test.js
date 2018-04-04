import React from 'react';
import {shallow, } from 'enzyme';
import '../../setupTests.js';
import RequiresLogin from './RequiresLogin';

describe('<RequiresLogin />', () => {
  it('Passes', () => {
    shallow(<RequiresLogin />);
  });
})
;
