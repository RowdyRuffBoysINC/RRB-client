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
    this.addedPersonId = null;
    this.enableAudio = true;
    this.enableCamera = true;
    this.remoteVideo = null;
    this.localVideo = null;
    this.pc = null;
    this.roomName = null;
    this.username = null;
    this.answersFrom = {};
    this.navigator = null;
    this.offer = null;
    this.sessionDescription = null;
    this.stunServer = 'stun:stun1.l.google.com:19302';

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

  setLocalVideo(src) {
    this.localVideo = <Video className="video-local-small"
      id={this.addedPersonId}
      key={this.addedPersonId}
      src={src}></Video>;
  }

  getLocalVideo() {
    return this.localVideo;
  }

  setRemoteVideo(src) {
    this.remoteVideo = <Video className="video-remote-large"
      src={window.URL.createObjectURL(src)}></Video>;
  }

  getRemoteVideo() {
    return this.remoteVideo;
  }

  createVideo(id) {
    this.pc.createOffer((offer) => {
      this.pc.setLocalDescription(new this.sessionDescription(offer), () => {
        socket.emit('make-offer', {
          offer,
          to: id,
          room: this.roomName,
        });
      }, error);
    }, error);
  }


  __createOffer(id) {
    this.pc.createOffer((offer) =>{
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
    socket.on('answer-made', (data) =>{
      this.pc.setRemoteDescription(new this.sessionDescription(data.answer), () =>{
        if(!this.answersFrom[data.socket]) {
          this.__createOffer(data.socket);
          this.answersFrom[data.socket] = true;
        }
      }, error);
    });
  }

  offerMade() {
    socket.on('offer-made', (data) => {
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
    socket.on('add-users', (data) => {
      dispatch(setUserList(data.users));
    });
  }

  removeUsers(dispatch) {
    socket.on('remove-user', (id) => {
      dispatch(deleteUserFromList(id));
    });
  }

  init(props) {
    trace('Running SIOC.init');
    const { roomName, username, dispatch, } = props;
    this.roomName = roomName;
    this.username = username;


    console.log(this.pc);

    this.pc.onaddstream= (obj) => {
      trace('onaddstream...');
      this.setLocalVideo(window.URL.createObjectURL(obj.stream));
    };
    
    console.log(this.pc.onaddstream);

    trace('running getUserMedia');
    this.navigator.getUserMedia({
      video: this.enableCamera,
      audio: this.enableAudio,
    }, (stream) => {
      this.setRemoteVideo(stream);
      this.pc.addStream(stream);
    }, error);

    // Wire socket events
    this.answerMade();
    this.offerMade();

    socket.emit('add-users', {
      room: roomName,
      user: username,
    });

    this.addUsers(dispatch);
    this.removeUsers(dispatch);
  }
}
