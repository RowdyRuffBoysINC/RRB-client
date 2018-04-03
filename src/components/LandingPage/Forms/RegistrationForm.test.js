import React from 'react';
import {shallow,} from 'enzyme';
import '../setupTests.js';
import {RegistrationForm,} from './RegistrationForm';

describe('<RegistrationForm />', () => {
  it('Passes', () => {
    shallow(<RegistrationForm handleSubmit={jest.fn}/>);
  });
})
;
