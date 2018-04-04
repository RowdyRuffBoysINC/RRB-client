import React from 'react';
import {shallow, } from 'enzyme';
import '../../setupTests.js';
import {EditorView,} from './EditorView';

describe('<EditorView />', () => {
  it('Passes', () => {
    shallow(<EditorView />);
  });
});
