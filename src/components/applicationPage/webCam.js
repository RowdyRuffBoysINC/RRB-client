/* eslint-disable */
import React from "react";
import socketIOClient from "socket.io-client";
import adapter from "webrtc-adapter";
import './webCam.css'
export class WebCam extends React.Component {
  componentDidMount() {
    this._init();
  }
  componentDidUpdate() {
    this._init();
  }

  _init() {

//#region Helpers
    /**
     * Helper functions to get this to work
     **/

    const trace = text => {
      text = text.trim();
      const now = (window.performance.now() / 1000).toFixed(3);
      console.log(now, text);
    };

    const getPeerName = peerConnection => {
      return peerConnection === localPeerConnection
        ? "localPeerConnection"
        : "remotePeerConnection";
    };

    const getOtherPeer = peerConnection => {
      return peerConnection === localPeerConnection
        ? remotePeerConnection
        : localPeerConnection;
    };

    const randomToken = () => {
      return Math.floor((1 + Math.random()) * 1e16)
        .toString(16)
        .substring(1);
    };

//#endregion

    const socket = socketIOClient.connect('http://localhost:8080');
    let answersFrom = {}, offer;

    const peerConnection = window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webKitRTCPeerConnection ||
    window.msRTCPeerConnection;

    const sessionDescription = window.RTCSessionDescription ||
    window.mozRTCSessionDescription ||
    window.webkitRTCSessionDescription ||
    window.msRTCSessionDescription

    navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUSerMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetuserMedia;

    const pc = new peerConnection({'iceServers': [{url: 'stun:stun1.l.google.com:19302'}]});

    pc.onaddstream = (obj) =>{
      const vid = document.createElement('video');
      vid.setAttribute('class', 'video-small');
      vid.setAttribute('autoplay', 'autoplay');
      vid.setAttribute('id', 'webCam-remoteVideo');
      document.getElementById('video-box').appendChild(vid);
      vid.src = window.URL.createObjectURL(obj.stream);
    }

    navigator.getUserMedia({video: true}, (stream) => {
      const videoBox = document.getElementById('video-box');
      const video = document.querySelector('video');
      video.src = window.URL.createObjectURL(stream);
      videoBox.appendChild(video);
      pc.addStream(stream);
    }, error);

    function error(err){
      console.error('Error', err);
    }

    const createOffer = (id) =>{
      pc.createOffer((offer) => {
        pc.setLocalDescription(new sessionDescription(offer), () => {
          socket.emit('make-offer', {
            offer: offer,
            to: id
          })
        }, error);
      }, error);
    }

    socket.on('answer-made', (data) => {
      pc.setRemoteDescription(new sessionDescription(data.answer), () =>{
        document.getElementById(data.socket).setAttribute('class', 'active');
        if(!answersFrom[data.socket]){
          createOffer(data.socket);
          answersFrom[data.socket] = true;
        }
      }, error);
    });

    socket.on('offer-made', (data) => {
      offer = data.offer;

      pc.setRemoteDescription(new sessionDescription(data.offer), () =>{
        pc.createAnswer((answer) => {
          pc.setLocalDescription(new sessionDescription(answer), () =>{
            socket.emit('make-answer', {
              answer: answer,
              to:data.socket
            });
          }, error)
        }, error);
      }, error);
    });

    socket.on('add-users', (data) =>{
      for(let i = 0; i < data.users.length; i++){
        const el = document.createElement('div'),
        id = data.users[i];

        el.setAttribute('id', id);
        el.innerHTML = id; // This would come from logged in user name.
        el.addEventListener('click', ()=>{
          createOffer(id);
        });
        document.getElementById('users').appendChild(el);
      }
    });

    socket.on('remove-user', (id) =>{
      let div = document.getElementById(id);
      if (div) document.getElementById('users').removeChild(div);
    });

}

  render() {
    return (
      <div className="webCam-container">
      <div className="video-box" id="video-box">
      <video className="video-large" id="webCam-localVideo" autoPlay></video>
      </div>
      <div className="users-container" id="users-container">
      <h4>Users</h4>
      <div id="users"></div>
      </div>
      </div>
    );
  }
}

export default WebCam;
