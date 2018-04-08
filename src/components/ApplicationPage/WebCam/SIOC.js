import React from 'react';
import {socket,} from '../Room';
import {trace, error,} from './helpers';
import Video from './Video';
import {
  setUserList,
  deleteUserFromList,
} from '../../../actions/Application';

export default class SIOC {
  constructor() {
    // addedPerson keeps track of the user you requested video from
    this.addedPerson = null;

    this.enableAudio = false;
    this.enableCamera = true;
    this.remoteVideo = null;
    this.localVideo = null;
    this.localVideoRef = null;
    this.pc = null;
    this.roomName = null;
    this.username = null;
    this.answersFrom = {};
    this.navigator = null;
    this.offer = null;
    this.sessionDescription = null;
    this.stunServer = 'stun:stun1.l.google.com:19302';

    this.setLocalVideoStream = null;
    this.setRemoteVideoStream = null;

    this._peerConnection = window.RTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.webkitRTCPeerConnection ||
      window.msRTCPeerConnection;


    this.pc = new this._peerConnection({'iceServers': [ {urls: this.stunServer,} , ],});


    this.sessionDescription = window.RTCSessionDescription ||
    window.mozRTCSessionDescription ||
    window.webkitRTCSessionDescription ||
    window.msRTCPeerConnection;

    navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
    this.navigator = navigator;
  }


  setStunServer(stun) {
    this.stunServer = stun;
  }


  getStunServer() {
    return this.stunServer;
  }

  createVideo(id) {
    this.pc.createOffer((offer) => {
      console.log('creating video aka creating offer');
      this.pc.setLocalDescription(new this.sessionDescription(offer), () => {
        socket.emit('make-offer', {
          offer,
          to: id,
          room: this.roomName,
          user: this.username,
        });
      }, error);
    }, error);
  }

  __createOffer(id) {
    this.pc.createOffer((offer) => {
      console.log('SIOC -> creating offer');
      this.pc.setLocalDescription(new this.sessionDescription(offer), () =>{
        socket.emit('make-offer', {
          offer,
          to: id,
          room: this.roomName,
        });
      }, error);
    }, error);
  }

  answerMade() {
    console.log('SIOC -> Created answerMade socket listener');
    socket.on('answer-made', (data) =>{
      console.log('SIOC -> answer was made');
      console.log('SIOC -> answerMade() -> data from socket', data);

      const { socket, user, } = data;
      this.addedPerson = { socket, user, };
      
      this.pc.setRemoteDescription(new this.sessionDescription(data.answer), () => {
        /*
        This runs more than once; even though a valid answer comes back from a remote user the first time.
        Might produce issues in the future?
        */

        if(!this.answersFrom[data.socket]) {
          console.log('SIOC -> answerMade() -> answer from socket doesnt exist..');
          this.__createOffer(data.socket);
          this.answersFrom[data.socket] = true;
        }
      }, error);
    });
  }

  offerMade() {
    console.log('SIOC -> Created offer made socket listener');
    socket.on('offer-made', (data) => {
      console.log('SIOC -> offerMade() -> offer was made');
      console.log('SIOC -> offerMade() -> data from socket', data);

      const userSocket = data.socket;
      const user = data.user;
      
      this.addedPerson = {};
      this.addedPerson.user = user;
      this.addedPerson.socket = userSocket;

      console.log('SIOC -> offer made');
      this.offer = data.offer;
      this.pc.setRemoteDescription(new this.sessionDescription(data.offer), () =>{
        this.pc.createAnswer((answer) => {
          this.pc.setLocalDescription(new this.sessionDescription(answer), () =>{
            socket.emit('make-answer', {
              answer,
              to: data.socket,
              room: this.roomName,
              user: this.username,
            });
          }, error);
        }, error);
      }, error);
    });
  }

  addUsers(dispatch) {
    console.log('added addUsers socket listener');
    socket.on('add-users', (data) => {
      console.log('SIOC -> addUsers -> add-users was event was emitted');
      dispatch(setUserList(data.users));
    });
  }

  removeUsers(dispatch) {
    socket.on('remove-user', (id) => {
      console.log('SIOC -> removeUser() -> remove-users was event was emitted', id);
      dispatch(deleteUserFromList(id));
    });
  }

  getLocalUserMedia() {
    trace('SIOC -> getLocalUserMedia -> running getUserMedia');
    this.navigator.getUserMedia({
      video: this.enableCamera,
      audio: this.enableAudio,
    }, (stream) => {
      this.setLocalVideoStream(stream);
      this.pc.addStream(stream);
    }, error);
  }

  init(props) {
    trace('Running SIOC.init');
    const { roomName, username, dispatch, setLocalVideoStream, setRemoteVideoStream, } = props;
    this.roomName = roomName;
    this.username = username;
    this.setLocalVideoStream = setLocalVideoStream;
    this.setRemoteVideoStream = setRemoteVideoStream;

    console.log('SIOC -> adding pc.onaddstream listener');
    /*
    This gets triggered whenever an [answer was made] aka this.pc.setRemoteDescription(data.answer) in answerMade func
    also setRemoteDescription is in [offer was made] func
    */
    this.pc.onaddstream = (obj) => {
      console.log('SIOC -> This.pc.onaddstream triggered');
      console.log('SIOC -> This.pc.onaddstream -> this user triggered the event: ', this.addedPerson);
      console.log('SIOC -> This.pc.onaddstream -> obj: ', obj); 
      this.setRemoteVideoStream(obj.stream, this.addedPerson);
    };

    // Wire socket events
    console.log('SIOC -> wiring socket events');
    this.answerMade();
    this.offerMade();

    console.log('SIOC -> emitting add-users');
    socket.emit('add-users', {
      room: roomName,
      user: username,
    });

    // Forgot what these did
    this.addUsers(dispatch);
    this.removeUsers(dispatch);
  }
}
