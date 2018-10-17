import React from 'react';
import { connect } from 'react-redux';

import './WebCam.css';

export class WebCam extends React.Component {
  createLocalVideo() {
    if (this.props.localVideoStream) {
      const videoSrc = window.URL
        .createObjectURL(this.props.localVideoStream);

      return (
        <video
          className="video-local-small"
          src={videoSrc}
          muted
          autoPlay />
      );
    }

    return null;
  }

  createRemoteVideos() {
    const arrOfVideos = [];
    if (this.props.remoteVideoStreams.length > 0) {
      for (const index in this.props.remoteVideoStreams) {
        const currentId = this.props.remoteVideoStreams[index].id;
        const currentStream = this.props.remoteVideoStreams[index].stream;

        const videoSrc = window.URL
          .createObjectURL(currentStream);

        arrOfVideos
          .push(
            <video
              key={currentId}
              className="video-remote-large"
              src={videoSrc}
              autoPlay
            />
          );
      }

      return arrOfVideos;
    }

    return null;
  }

  render() {
    if (this.props.roomView === 'video') {
      return (
        <section className="video-container">
          {this.createLocalVideo()}
          {this.createRemoteVideos()}
        </section>
      );
    }
    else return (
      <section className="audio-only-render" />
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  roomName: state.applicationReducer.roomName,
  localVideoStream: state.applicationReducer.localVideoStream,
  remoteVideoStreams: state.applicationReducer.remoteVideoStreams,
  roomView: state.applicationReducer.roomView,
});

export default connect(mapStateToProps)(WebCam);
