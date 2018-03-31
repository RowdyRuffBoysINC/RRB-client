import React from 'react';
import thunk from 'redux-thunk';
import { shallow, } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import '../../setupTests.js';
import Application from './Application.js';

const initialState = {};

const middlewares = [ thunk , ];
const mockStore = configureMockStore(middlewares);
let store;
let wrapper;

beforeEach(() =>{
  store = mockStore(initialState);
});

describe ('<Application />', () =>{
  it('passes a smoke test', () =>{
    // Add Application test here
  });
});

