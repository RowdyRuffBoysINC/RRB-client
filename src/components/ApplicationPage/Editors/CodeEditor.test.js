import React from 'react';
import {shallow, } from 'enzyme';
import '../../../setupTests.js';
import {CodeEditor,} from './CodeEditor';

describe('<CodeEditor />', () => {
  it('Passes', () => {
    shallow(<CodeEditor />);
  });
});
