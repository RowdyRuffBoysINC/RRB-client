/* eslint-disable */
import React from "react";
import socketIOClient from "socket.io-client";
import adapter from "webrtc-adapter";
import {connect} from 'react-redux'
import './webCam.css'
export class WebCam extends React.Component {
  
  componentWillMount () {
    this.trace('I just executed component will mount');
    this._init();
  }

  componentDidUpdate() {
    this.trace('I just executed component did update')
    this._update();
  }

  trace(text){
    text = text.trim();
    const now = (window.performance.now() / 1000).toFixed(3);
    console.log(now, text);
  };

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
      trace('added a stream')
      const vid = document.createElement('video');
      vid.setAttribute('class', 'video-small');
      vid.setAttribute('autoplay', 'autoplay');
      vid.setAttribute('id', 'webCam-remoteVideo');
      document.getElementById('video-box').appendChild(vid);
      vid.src = window.URL.createObjectURL(obj.stream);
    }

    navigator.getUserMedia({video: true}, (stream) => {
      trace('get webcam')
      const videoBox = document.getElementById('video-box');
      const video = document.querySelector('video');
      video.src = window.URL.createObjectURL(stream);
      videoBox.appendChild(video);
      video.load();
      pc.addStream(stream);
    }, error);

    function error(err){
      trace('some shit happened')
      console.error('Error', err);
    }

    const createOffer = (id) =>{
      trace('creating an offer')
      pc.createOffer((offer) => {
        pc.setLocalDescription(new sessionDescription(offer), () => {
          trace('making an offer locally')
          socket.emit('make-offer', {
            offer: offer,
            to: id,
            room: this.props.roomName
          })
        }, error);
      }, error);
    }

    socket.on('answer-made', (data) => {
      trace('an answer was made')
      pc.setRemoteDescription(new sessionDescription(data.answer), () =>{
        document.getElementById(data.socket).setAttribute('class', 'active');
        if(!answersFrom[data.socket]){
          createOffer(data.socket);
          answersFrom[data.socket] = true;
        }
      }, error);
    });

    socket.on('offer-made', (data) => {
      trace('an offer was made')
      offer = data.offer;

      pc.setRemoteDescription(new sessionDescription(data.offer), () =>{
        pc.createAnswer((answer) => {
          pc.setLocalDescription(new sessionDescription(answer), () =>{
            trace('making an answer')
            socket.emit('make-answer', {
              answer: answer,
              to:data.socket,
              room: this.props.roomName
            });
          }, error)
        }, error);
      }, error);
    });

    socket.emit('add-users',{
      room: this.props.roomName, 
      user: this.props.username
    }, trace('announcing a user'))

    socket.on('add-users', (data) =>{
      trace('added a user from server')
      for(let i = 0; i < data.users.length; i++){
        const el = document.createElement('div'),
        id = data.users[i];

        el.setAttribute('id', id);
        el.innerHTML = `The user with id ${id} is here (${data.user})`; // This would come from logged in user name.
        el.addEventListener('click', ()=>{
          createOffer(id);
        });
        document.getElementById('users').appendChild(el);
      }
    });

    socket.on('remove-user', (id) =>{
      trace('removing a user')
      let div = document.getElementById(id);
      if (div) document.getElementById('users').removeChild(div);
    });

}

_update() {

  //#region Helpers
      /**
       * Helper functions to get this to work
       **/
  
      const trace = text => {
        text = text.trim();
        const now = (window.performance.now() / 1000).toFixed(3);
        console.log(now, text);
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
        trace('adding stream from update')
        const vid = document.createElement('video');
        vid.setAttribute('class', 'video-small');
        vid.setAttribute('autoplay', 'autoplay');
        vid.setAttribute('id', 'webCam-remoteVideo');
        document.getElementById('video-box').appendChild(vid);
        vid.src = window.URL.createObjectURL(obj.stream);
      }
  
      navigator.getUserMedia({video: true}, (stream) => {
        trace('getting camera from update')
        const videoBox = document.getElementById('video-box');
        const video = document.querySelector('video');
        video.src = window.URL.createObjectURL(stream);
        videoBox.appendChild(video);
        video.load();
        pc.addStream(stream);
      }, error);
  
      function error(err){
        trace('some shit went wrong in update')
        console.error('Error', err);
      }
  
      const createOffer = (id) =>{
        pc.createOffer((offer) => {
          trace('making a local offer from update')
          pc.setLocalDescription(new sessionDescription(offer), () => {
            socket.emit('make-offer', {
              offer: offer,
              to: id,
              room: this.props.roomName
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
        trace('an offer was made from update')
        offer = data.offer;
  
        pc.setRemoteDescription(new sessionDescription(data.offer), () =>{
          pc.createAnswer((answer) => {
            pc.setLocalDescription(new sessionDescription(answer), () =>{
              trace('an answer was made from update')
              socket.emit('make-answer', {
                answer: answer,
                to:data.socket,
                room: this.props.roomName
              });
            }, error)
          }, error);
        }, error);
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
      <h4>Room: {this.props.roomName}</h4>
      <div id="users"></div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.auth.currentUser.username,
  roomName: state.applicationReducer.roomName,
});

export default connect(mapStateToProps)(WebCam);
