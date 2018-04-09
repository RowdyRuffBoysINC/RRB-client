/* eslint-disable */
import React from "react";
import adapter from "webrtc-adapter";
import { connect } from 'react-redux';
import UserList from "../UserList";
import { deleteLocalUserStream, } from '../../../actions/Application';
import { trace, erro } from './helpers';
// import SIOC from '../SIOC';
import './WebCam.css'

export class WebCam extends React.Component {

  createLocalVideo() {
    if (this.props.localVideoStream) {

      const videoSrc = window.URL.createObjectURL(this.props.localVideoStream);

      return (<video className='video-local-small' src={videoSrc} muted autoPlay></video>);
    }

    return null;
  }

  createRemoteVideos() {
    const arrOfVideos = [];
    if (this.props.remoteVideoStreams.length > 0) {

      for (let index in this.props.remoteVideoStreams) {

        let currentId = this.props.remoteVideoStreams[index].id;
        let currentStream = this.props.remoteVideoStreams[index].stream;

        const videoSrc = window.URL.createObjectURL(currentStream);
      
        arrOfVideos.push(<video key={currentId} className='video-remote-large' src={videoSrc} autoPlay></video>);
      }

      return arrOfVideos;
    }

    return null;
  }

  render() {

    return (
      <section className="video-container">
        <section className="video-box" id="video-box">
          <h1>Video</h1>
          {this.createLocalVideo()}
          {this.createRemoteVideos()}
        </section>
        <section className="users-container" id="users-container">
          <h4> Room: {this.props.roomName} </h4>
          <UserList />
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.auth.currentUser.username,
  roomName: state.applicationReducer.roomName,
  localVideoStream: state.applicationReducer.localVideoStream,
  remoteVideoStreams: state.applicationReducer.remoteVideoStreams,
});

export default connect(mapStateToProps)(WebCam);
