/* eslint-disable */
import React from "react";
import adapter from "webrtc-adapter";
import { connect } from 'react-redux';
import UserList from "../UserList";
import './WebCam.css'
import {trace, error} from './helpers';
import SIOC from './SIOC';

export class WebCam extends React.Component {
  constructor(props) {
    super(props);
    this.SIOC = new SIOC();
    console.log('Index.js -> new instance of SIOC');
  }

  componentWillMount() {
    console.log('Index.js -> ComponentDidMount -> init');
    this.SIOC.init(this.props);
  }

  componentDidMount() {
    this.SIOC.getLocalUserMedia();
  }

  componentWillUpdate() {
    console.log('Index.js -> update?');
  }

  componentDidUpdate() {
    console.log('Index.js -> didupdate');
  }

  createLocalVideo() {
    if (this.props.localVideoStream) {
      console.log('Index.js -> createLocalVideo -> localVideoStream exists');

      const videoSrc = window.URL.createObjectURL(this.props.localVideoStream);

      console.log('Index.js -> createLocalVideo -> localVideoStream exists -> turned into src -> return it');

      return (<video className='video-local-small' src={videoSrc} autoPlay></video>);
    }

    console.log('Index.js -> createLocalVideo -> localVideoStream is null -> return null');

    return null;
  }

  createRemoteVideos() {
    const arrOfRemoteVideoStreamKeys = Object.keys(this.props.remoteVideoStreams);
    const arrOfVideos = [];
    if (arrOfRemoteVideoStreamKeys.length > 0) {
      console.log('Indexjs -> createRemoteVideo -> a remoteVideoStream exists');
      for (let key in arrOfRemoteVideoStreamKeys) {
        const videoSrc = window.URL.createObjectURL(this.props.remoteVideoStreams[arrOfRemoteVideoStreamKeys[key]]);
        console.log('Index.js -> createRemoteVideos -> for loop: ', key, arrOfRemoteVideoStreamKeys[key], this.props.remoteVideoStreams[arrOfRemoteVideoStreamKeys[key]], videoSrc);
      
        arrOfVideos.push(<video key={arrOfRemoteVideoStreamKeys[key]} className='video-remote-large' src={videoSrc} autoPlay></video>);
        console.log('Index.js -> createRemoteVideos -> videos: ', arrOfVideos);
      }

      return arrOfVideos;
    }

    console.log('Index.js -> createRemoteVideos -> localVideoStream is null -> return null');

    return null;
  }

  render() {
    console.log('Index.js -> render');
    console.log('Index.js -> this.state: ', this.state);

    return (
      <section className="video-container">
        <section className="video-box" id="video-box">
          <h1>Video</h1>
          {this.createLocalVideo()}
          {this.createRemoteVideos()}
        </section>
        <section className="users-container" id="users-container">
          <h4> Room: {this.props.roomName} </h4>
          <UserList createOffer={(id) => this.SIOC.createVideo(id)} />
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
