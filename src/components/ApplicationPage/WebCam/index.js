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

    this.state = {
      localVideoStream: null,
    };
  }

  componentWillMount() {
    console.log('Index.js -> ComponentDidMount -> init');
    this.SIOC.init(this.props);
  }

  componentDidMount() {
    this.SIOC.getLocalUserMedia((src) => this.setLocalVideoStream(src));
  }

  componentWillUpdate() {
    console.log('index.js -> update?');
  }

  componentDidUpdate() {
    console.log('index.js -> didupdate');
  }

  setLocalVideoStream(stream) {
    console.log('Index.js -> setlocalVideoStream -> src: ', stream);
    this.setState({ localVideoStream: stream });
  }

  createLocalVideo() {
    if (this.state.localVideoStream) {
      console.log('Indexjs -> createLocalVideo -> localVideoStream exists');

      const videoSrc = window.URL.createObjectURL(this.state.localVideoStream);

      console.log('Indexjs -> createLocalVideo -> localVideoStream exists -> turned into src -> return it');

      return (<video className='video-small'src={videoSrc} autoPlay></video>);
    }

    console.log('Indexjs -> createLocalVideo -> localVideoStream is null -> return null');

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
