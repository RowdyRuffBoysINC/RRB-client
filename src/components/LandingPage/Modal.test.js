import React from 'react';
import {shallow, } from 'enzyme';
import '../../setupTests.js';
import {Modal,} from './Modal';

describe('<Modal />', () => {
  it('Passes', () => {
    shallow(<Modal />);
  });
});
