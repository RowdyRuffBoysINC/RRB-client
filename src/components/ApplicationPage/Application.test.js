import React from 'react';
import { shallow, } from 'enzyme';
import '../../setupTests.js';
import {Dashboard,} from './Application.js';

describe ('<Dashboard />', () =>{
  it('passes a smoke test', () =>{

    shallow(<Dashboard match={{url: '/dsahboard',}} dispatch={jest.fn}/>);
  });
});

