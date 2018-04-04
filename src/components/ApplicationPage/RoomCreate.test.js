import React from 'react';
import {shallow, } from 'enzyme';
import '../../setupTests.js';
import {Dashboard,} from './RoomCreate';

describe('<Dashboard />', () => {
  it('Passes', () => {
    shallow(<Dashboard />);
  });
});
