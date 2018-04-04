import React from 'react';
import {shallow, } from 'enzyme';
import '../../../setupTests.js';
import Input from './Input';

describe('<Input />', () => {
  it('Passes', () => {
    const meta = {touched: false,};
    const store = {
      touched: false,
      name: {},
      type: {},
      ref: {},

    };
    shallow(<Input
      input={{name: '',}}
      meta={meta} />);
  });
});
