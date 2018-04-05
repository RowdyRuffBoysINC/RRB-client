/* eslint-disable */
import React from "react";
import socketIOClient from "socket.io-client";
import adapter from "webrtc-adapter";
import { connect } from 'react-redux';

import { socket } from "../Room";
import * as ApplicationActions from "../../../actions/Application";
import UsersList from "../UsersList";
import './WebCam.css'
import Video from './Video';
import {trace, error} from './helpers';
import SICO from './SIOC';

export class WebCam extends React.Component {
  constructor(props) {
    super(props);

    this.addedPersonId = '';

    this.SIOC = new SIOC();

    this.localVideo = null;
    this.remoteVideo =null;
  }

  componentWillMount() {
    this._init();
  }

  _init() {

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
      this.localVideo = <Video style={{backgroundColor:'red'}} className="-local-small" videoId="local"
      muted={this.props.muted}></Video>
      this.localVideo.srcObject = stream;
      this.pc.addStream(stream);
    }, error);

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
      <section className="video-container">
        <section className="video-box" id="video-box">
        =
        {this.localVideo}
        </section>
        <section className="users-container" id="users-container">
          <h4> Room: {this.props.roomName} </h4>
          <UsersList createOffer={(id) => this.createVideo(id)} />
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
