import React from 'react';
import {shallow,} from 'enzyme';
import '../setupTests.js';
import {LoginForm,} from './LoginForm';

describe('<LoginForm />', () => {
  it('Passes', () => {
    shallow(<LoginForm handleSubmit={jest.fn}/>);
  });
})
;
