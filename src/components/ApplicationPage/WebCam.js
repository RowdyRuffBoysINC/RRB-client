/* eslint-disable */
import React from "react";
import socketIOClient from "socket.io-client";
import adapter from "webrtc-adapter";
import { connect } from 'react-redux';

import { socket } from "./Room";
import * as ApplicationActions from "../../actions/Application";
import UserList from "./UserList";
import './WebCam.css'

export class WebCam extends React.Component {
  constructor(props) {
    super(props);
    this.addedPersonId = '';

    this.peerConnection = window.RTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.webKitRTCPeerConnection ||
      window.msRTCPeerConnection;

    this.sessionDescription = window.RTCSessionDescription ||
      window.mozRTCSessionDescription ||
      window.webkitRTCSessionDescription ||
      window.msRTCSessionDescription

    navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUSerMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetuserMedia;

    this.navigator = navigator;

    this.pc = new this.peerConnection({ 'iceServers': [{ url: 'stun:stun1.l.google.com:19302' }] });

  }

  componentWillMount() {

    this._init();

  }

  trace(text) {
    text = text.trim();
    const now = (window.performance.now() / 1000).toFixed(3);
  };

  createVideo(id) {

    let answersFrom = {}, offer;

    function error(err) {
      trace('some shit happened');
    }

    function trace(text) {
      text = text.trim();
      const now = (window.performance.now() / 1000).toFixed(3);
    };


    this.pc.createOffer((offer) => {
      this.pc.setLocalDescription(new this.sessionDescription(offer), () => {
        trace('making an offer locally')
        socket.emit('make-offer', {
          offer: offer,
          to: id,
          room: this.props.roomName
        })
      }, error);
    }, error);


  }


  _init() {

    //#region Helpers
    /**
     * Helper functions to get this to work
     **/

    const trace = text => {
      text = text.trim();
      const now = (window.performance.now() / 1000).toFixed(3);
    };

    //#endregion
    let answersFrom = {}, offer;

    this.pc.onaddstream = (obj) => {
      trace('added a stream');
      const vid = document.createElement('video');
      vid.setAttribute('class', 'video-small');
      vid.setAttribute('autoplay', 'autoplay');
      vid.setAttribute('id', `video-${this.addedPersonId}`);
      if (this.addedPersonId)
        vid.setAttribute("key", `${this.addedPersonId}`);

      document.getElementById('video-box').appendChild(vid);
      vid.src = window.URL.createObjectURL(obj.stream);
    }

    this.navigator.getUserMedia({ video: true, audio: true, }, (stream) => {
      trace('get webcam FROM INIT')
      const videoBox = document.getElementById('video-box');
      const video = document.querySelector('video');
      video.src = window.URL.createObjectURL(stream);
      videoBox.appendChild(video);
      video.load();
      this.pc.addStream(stream);
    }, error);

    function error(err) {
      trace('some shit happened');
    }

    const createOffer = (id) => {
      trace('creating an offer')
      this.pc.createOffer((offer) => {
        this.pc.setLocalDescription(new this.sessionDescription(offer), () => {
          trace('making an offer locally')
          socket.emit('make-offer', {
            offer: offer,
            to: id,
            room: this.props.roomName
          })
        }, error);
      }, error);
    }

    socket.on('answer-made', (data) => {

      trace('an answer was made FROM INIT');

      this.pc.setRemoteDescription(new this.sessionDescription(data.answer), () => {
        if (!answersFrom[data.socket]) {
          createOffer(data.socket);
          answersFrom[data.socket] = true;
        }
      }, error);
    });

    socket.on('offer-made', (data) => {
      trace('an offer was made FROM INIT')
      offer = data.offer;

      this.pc.setRemoteDescription(new this.sessionDescription(data.offer), () => {
        this.pc.createAnswer((answer) => {
          this.pc.setLocalDescription(new this.sessionDescription(answer), () => {
            trace('making an answer')
            socket.emit("make-answer", {
              answer: answer,
              to: data.socket,
              room: this.props.roomName,
              user: this.props.username
            });
          }, error)
        }, error);
      }, error);
    });

    socket.emit('add-users', {
      room: this.props.roomName,
      user: this.props.username
    }, trace('announcing a user FROM INIT'))

    socket.on('add-users', (data) => {
      this.props.dispatch(ApplicationActions.setUserList(data.users));
    });

    socket.on("remove-user", id => {
      this.props.dispatch(ApplicationActions.deleteUserFromList(id));
    });


  }

  render() {
    return (
      <section className="webcam-container">
        <section className="video-box" id="video-box">
          <video className="video-large" id="webcam-local-video" autoPlay></video>
        </section>
        <section className="users-container" id="users-container">
          <h4 className="room-name"> Room: {this.props.roomName} </h4>
          <UserList createOffer={(id) => this.createVideo(id)} />
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.auth.currentUser.username,
  roomName: state.applicationReducer.roomName,
});

export default connect(mapStateToProps)(WebCam);
