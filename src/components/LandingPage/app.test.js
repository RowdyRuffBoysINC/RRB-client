import React from 'react';
import {shallow,} from 'enzyme';
import '../setupTests.js';
import {app,} from './App';

describe('<app />', () => {
  it('Passes', () => {
    shallow(<app />);
  });
})
;
