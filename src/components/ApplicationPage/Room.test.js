import React from 'react';
import {shallow, } from 'enzyme';
import '../../setupTests.js';
import {Room,} from './Room';

describe('<Room />', () => {
  it('Passes', () => {
    const match = {
      params: {
        roomName: 'test',
        username: 'test',
      },
    };

    shallow(<Room match={match} dispatch={jest.fn}/>);
  });
});
