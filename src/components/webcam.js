/* eslint-disable */
import React from 'react';
import socketIOClient from 'socket.io-client';
import adapter from 'webrtc-adapter';
export class WebCam extends React.Component {
  componentDidMount() {
    this._init();
  }
  componentDidUpdate() {
    this._init();
  }

  _init() {
    /**
    * Helper functions to get this to work
    **/

    
    const trace = (text) => {
      text = text.trim();
      const now = (window.performance.now() / 1000).toFixed(3);
      console.log(now, text);
    };

    const getPeerName = (peerConnection) => {
      return (peerConnection === localPeerConnection) ? 'localPeerConnection' : 'remotePeerConnection';
    };

    const getOtherPeer = (peerConnection) => {
      return (peerConnection === localPeerConnection) ? remotePeerConnection : localPeerConnection;
    };

    const randomToken = () =>{
      return Math.floor((1+Math.random())*1e16).toString(16).substring(1);
    };


  render() {
    return(
      <div className="webCam-container">
        <video className="webCam-localVideo" id="webCam-localVideo" autoPlay></video>
        <video className="webCam-remoteVideo" id="webCam-remoteVideo" autoPlay></video>
        <div>
          <button id="webCam-startButton">Start</button>
          <button id="webCam-callButton">Call</button>
          <button id="webCam-hangupButton">Hang Up</button>
        </div>
      </div>
    );
  }
}

export default WebCam;
