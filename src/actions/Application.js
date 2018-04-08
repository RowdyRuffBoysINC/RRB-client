/* This actions file handles actions that pertain to the 2nd main page, the applications page */

export const SET_CREATE_INPUT = 'SET_CREATE_INPUT';
export const setCreateInput = input => ({ type: SET_CREATE_INPUT, data: input, });

export const SET_USER_LIST = 'SET_USER_LIST';
export const setUserList = input => ({ type: SET_USER_LIST, data: input, });

export const DELETE_USER_FROM_LIST = 'DELETE_USER_FROM_LIST';
export const deleteUserFromList = input => ({ type: DELETE_USER_FROM_LIST, data: input, });

export const SET_LOCAL_USER_VIDEO = 'SET_LOCAL_USER_VIDEO';
export const setLocalUserVideo = stream => ({ type: SET_LOCAL_USER_VIDEO, data: stream, });

export const SET_REMOTE_USER_VIDEO = 'SET_REMOTE_USER_VIDEO';
export const setRemoteUserVideo = (stream, id) => ({ type: SET_REMOTE_USER_VIDEO, data: { stream, id, }, });

export const DELETE_REMOTE_USER_VIDEO = 'DELETE_REMOTE_USER_VIDEO';
export const deleteRemoteUserVideo = id => ({ type: DELETE_REMOTE_USER_VIDEO, data: id, });
