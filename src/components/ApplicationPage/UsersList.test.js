import React from 'react';
import {shallow, } from 'enzyme';
import '../../setupTests.js';
import {UsersList,} from './UsersList';

describe('<UsersList />', () => {
  it('Passes', () => {
    shallow(<UsersList userList= {[ 1,2,3,4 , ]} />);
  });
});
