import React from 'react';
import {shallow,} from 'enzyme';
import '../setupTests.js';
import HeaderBar from './header-bar';

describe('<HeaderBar />', () => {
  it('Passes', () => {
    const mockStore = {
      getState: jest.fn(),
      dispatch: jest.fn(),
    };

    shallow(<HeaderBar store={mockStore} loggedIn={false} />);
  });
})
;
