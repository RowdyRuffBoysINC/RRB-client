/* This actions file handles actions that pertain to the 2nd main page, the applications page */

export const SET_CREATE_INPUT = 'SET_CREATE_INPUT';
export const setCreateInput = input => ({ type: SET_CREATE_INPUT, data: input, });

// Export const AUTH_REQUEST = 'AUTH_REQUEST';

export const SET_USER_LIST = 'SET_USER_LIST';
export const setUserList = input => ({ type: SET_USER_LIST, data: input, });

export const SET_USER_VIDEO = 'SET_USER_VIDEO';
export const setUserVideo = input => ({ type: SET_USER_VIDEO, data: input, });

export const DELETE_USER_FROM_LIST = 'DELETE_USER_FROM_LIST';
export const deleteUserFromList = input => ({ type: DELETE_USER_FROM_LIST, data: input, });

export const DELETE_USER_VIDEO = 'DELETE_USER_VIDEO';
export const deleteUserVideo = input => ({ type: DELETE_USER_VIDEO, data: input, });
