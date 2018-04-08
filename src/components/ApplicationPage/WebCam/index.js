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

    // Future change; turn state into Redux state
    this.state = {
      localVideoStream: null,
      remoteVideoStreams: {}
    };
  }

  componentWillMount() {
    console.log('Index.js -> ComponentDidMount -> init');
    // Design Q: Pass funcs as props or as callbacks?
    const newProps = { 
      ...this.props,
      setLocalVideoStream: (stream) => this.setLocalVideoStream(stream),
      setRemoteVideoStream: (stream, id) => this.setRemoteVideoStream(stream, id) 
    };

    this.SIOC.init(newProps);
  }

  componentDidMount() {
    this.SIOC.getLocalUserMedia();
  }

  componentWillUpdate() {
    console.log('index.js -> update?');
  }

  componentDidUpdate() {
    console.log('index.js -> didupdate');
  }

  setLocalVideoStream(stream) {
    console.log('Index.js -> setlocalVideoStream -> stream: ', stream);
    this.setState({ localVideoStream: stream });
  }

  setRemoteVideoStream(stream, person) {
    console.log('Index.js -> setRemoteVideoStream -> stream: ', stream);
  }

  createLocalVideo() {
    if (this.state.localVideoStream) {
      console.log('Indexjs -> createLocalVideo -> localVideoStream exists');

      const videoSrc = window.URL.createObjectURL(this.state.localVideoStream);

      console.log('Indexjs -> createLocalVideo -> localVideoStream exists -> turned into src -> return it');

      return (<video className='video-local-small' src={videoSrc} autoPlay></video>);
    }

    console.log('Indexjs -> createLocalVideo -> localVideoStream is null -> return null');

    return null;
  }

  createRemoteVideos() {
    const arrOfRemoteVideoStreamKeys = Object.keys(this.state.remoteVideoStreams);

    if (arrOfRemoteVideoStreamKeys.length > 0) {

    }

    console.log('Indexjs -> createRemoteVideos -> localVideoStream is null -> return null');

    return null;
  }

  render() {
    console.log('index.js -> render');
    return (
      <section className="video-container">
        <section className="video-box" id="video-box">
          <h1>Video</h1>
          {this.createLocalVideo()}
          {/* {this.SIOC.getRemoteVideo()} */}
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
});

export default connect(mapStateToProps)(WebCam);
