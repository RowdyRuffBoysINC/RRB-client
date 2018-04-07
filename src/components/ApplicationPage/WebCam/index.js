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
      localVideoSrc: null,
    };
  }

  componentWillMount() {
    // this.SIOC.setL
    console.log('Index.js -> ComponentDidMount -> init');
    this.SIOC.init(this.props);
  }

  componentDidMount() {
    this.SIOC.getLocalUserMedia((src) => this.setLocalVideoSrc(src));
    // console.log('set localvideo to this: ', this.SIOC.getLocalVideo());
    // this.setState({ localVideo: this.SIOC.getLocalVideo() });
  }

  componentWillUpdate() {
    console.log('index.js -> update?');
  }

  componentDidUpdate() {
    console.log('index.js -> didupdate');
  }

  setLocalVideoSrc(src) {
    console.log('Index.js -> setLocalVideoSrc -> src: ', src);
    this.setState({ localVideoSrc: src });
  }

  render() {
    console.log('index.js -> render');
    return (
      <section className="video-container">
        <section className="video-box" id="video-box">
          {/* {this.state.localVideo} */}
          {this.SIOC.getLocalVideo()}
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
