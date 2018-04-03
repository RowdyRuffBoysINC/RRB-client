import React from 'react';
import {shallow,} from 'enzyme';
import '../setupTests.js';
import {RegistrationForm,} from './registration-form';

describe('<RegistrationForm />', () => {
  it('Passes', () => {
    shallow(<RegistrationForm handleSubmit={jest.fn}/>);
  });
})
;
