/* This actions file handles actions that pertain to the 2nd main page, the applications page */

export const SET_CREATE_INPUT = 'SET_CREATE_INPUT';
export const setCreateInput = input => ({ type: SET_CREATE_INPUT, data: input });

export const SET_USER_LIST = 'SET_USER_LIST';
export const setUserList = input => ({ type: SET_USER_LIST, data: input });

export const DELETE_USER_FROM_LIST = 'DELETE_USER_FROM_LIST';
export const deleteUserFromList = input => ({ type: DELETE_USER_FROM_LIST, data: input });

export const TOGGLE_WEBCAM_AUDIO = 'TOGGLE_WEBCAM_AUDIO';
export const toggleWebcamAudio = input => ({ type: TOGGLE_WEBCAM_AUDIO, data: input });

export const TOGGLE_WEBCAM_VIDEO = 'TOGGLE_WEBCAM_VIDEO';
export const toggleWebcamVideo = input => ({ type: TOGGLE_WEBCAM_VIDEO, data: input });

export const SET_CREATE_VIDEO_FUNC = 'SET_CREATE_VIDEO_FUNC';
export const setCreateVideoFunc = func => ({ type: SET_CREATE_VIDEO_FUNC, data: func });

export const SET_LOCAL_USER_STREAM = 'SET_LOCAL_USER_STREAM';
export const setLocalUserStream = stream => ({ type: SET_LOCAL_USER_STREAM, data: stream });

export const DELETE_LOCAL_USER_STREAM = 'DELETE_LOCAL_USER_STREAM';
export const deleteLocalUserStream = () => ({ type: DELETE_LOCAL_USER_STREAM });

export const SET_REMOTE_USER_STREAM = 'SET_REMOTE_USER_STREAM';
export const setRemoteUserStream = (stream, addedPerson) => ({ type: SET_REMOTE_USER_STREAM, data: { stream, id: addedPerson.socket, user: addedPerson.user } });

export const DELETE_REMOTE_USER_STREAM = 'DELETE_REMOTE_USER_STREAM';
export const deleteRemoteUserStream = id => ({ type: DELETE_REMOTE_USER_STREAM, data: id });

export const SET_ROOM_VIEW = 'SET_ROOM_VIEW';
export const setRoomView = input => ({ type: SET_ROOM_VIEW, data: input });
