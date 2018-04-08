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


  setLocalVideo(src) {
    console.log('Setting local video.');
    console.log('Setting local video. -> src: ', src);
    this.localVideo = <Video className="video-local-small"
      id={this.addedPersonId}
      key={this.addedPersonId}
      src={src}></Video>;
    console.log('Setting local video. -> this.localVideo:  ', this.localVideo);
  }

  getLocalVideo() {
    console.log('Getting local video', this.localVideo);
    return this.localVideo;
  }

  setRemoteVideo(src) {
    trace('Setting remote video');
    this.remoteVideo = <Video
      className="video-remote-large"
      src={window.URL.createObjectURL(src)}>
    </Video>;

  }

  getRemoteVideo() {
    return this.remoteVideo;
  }

  createVideo(id) {
    this.pc.createOffer((offer) => {
      console.log('creating video aka creating offer');
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
      this.pc.setRemoteDescription(new this.sessionDescription(data.answer), () => {
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
      console.log('SIOC -> addUsers -> add-users was event was emitted');
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
    // This gets triggered whenever an [answer was made] aka this.pc.setRemoteDescription(data.answer) in answerMade func
    this.pc.onaddstream = (obj) => {
      console.log('SIOC -> This.pc.onaddstream triggered');
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
