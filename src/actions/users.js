import { SubmissionError, } from 'redux-form';

import { API_BASE_URL, } from '../config';
import { normalizeResponseErrors, } from './utils';

export const registerUser = user => async (dispatch) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', },
      body: JSON.stringify(user),
    })
    return await response.json();
  }
  catch (err) {
    const { reason, message, location, } = err;
    if (reason === 'ValidationError') {
      // Convert ValidationErrors into SubmissionErrors for Redux Form
      return Promise.reject(
        new SubmissionError({ [location]: message, })
      );
    }
  };

};
