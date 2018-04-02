import React from 'react';
import {shallow,} from 'enzyme';
import '../setupTests.js';
import {app,} from './app';

describe('<app />', () => {
  it('Passes', () => {
    shallow(<app />);
  });
})
;
