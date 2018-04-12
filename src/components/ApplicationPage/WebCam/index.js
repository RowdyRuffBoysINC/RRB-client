import React from 'react';
import { connect, } from 'react-redux';
import './WebCam.css';

export class WebCam extends React.Component {
  createLocalVideo() {
    if (this.props.localVideoStream) {
      const videoSrc = window.URL.createObjectURL(this.props.localVideoStream);

      return (
        <section>
          <video className="video-local-small" src={videoSrc} muted autoPlay></video>
          <video className="video-local-large" src={videoSrc} muted autoPlay></video>
        </section>
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

        const videoSrc = window.URL.createObjectURL(currentStream);

        arrOfVideos.push(<video key={currentId} className="video-remote-large" src={videoSrc} autoPlay></video>);
      }

      return arrOfVideos;
    }

    return null;
  }

  render() {
    return (
      <section className="video-container">
        {this.createLocalVideo()}
        {this.createRemoteVideos()}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  roomName: state.applicationReducer.roomName,
  localVideoStream: state.applicationReducer.localVideoStream,
  remoteVideoStreams: state.applicationReducer.remoteVideoStreams,
});

export default connect(mapStateToProps)(WebCam);
