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
    console.log('SIOC', this.SIOC);

    this.state = {
      localVideo: null,
    };
  }

  componentWillMount() {
    console.log('running SIOC init');
    this.SIOC.init(this.props);
    // this.SIOC.setL
  }

  componentDidMount() {
    console.log('ComponentDidMount ->');
    console.log('set localvideo to this: ', this.SIOC.getLocalVideo());
    this.setState({ localVideo: this.SIOC.getLocalVideo() });
  }

  componentWillUpdate() {
    console.log('update?');
  }

  render() {
    return (
      <section className="video-container">
        <section className="video-box" id="video-box">
          {this.state.localVideo}
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
