import React from 'react';
import socketIOClient from 'socket.io-client';

export class WebCam extends React.Component {
  componentDidMount() {
    this._init();
  }
  componentDidUpdate() {
    this._init();
  }

  _init() {
    const socket = socketIOClient.connect('http://localhost:8080');
    console.log('Created socket.');
    const answersFrom = {};
    let offer;

    const peerConnection = window.RTCPeerConnection ||window.mozRTCPeerConnection ||window.webkitRTCPeerConnection ||window.msRTCPeerConnection;

    const sessionDescription = window.RTCSessionDescription ||window.mozRTCSessionDescription ||window.webkitRTCSessionDescription ||window.msRTCSessionDescription;

    navigator.getUserMedia = navigator.getUserMedia ||navigator.webkitGetUserMedia ||navigator.mozGetUserMedia ||navigator.msGetUserMedia;

    const pc = new peerConnection({iceServers: [ {url: 'stun:stun4.l.google.com:19302',}, ],});
    pc.onaddstream = (obj) =>{
      const vid = document.createElement('video');
      vid.setAttribute('class', 'webCam-video-small');
      vid.setAttribute('autoplay', 'autoplay');
      vid.setAttribute('id', 'webCam-video-small');
      document.getElementById('webCam-users-container').appendChild(vid);
      vid.src = window.URL.createObjectURL(obj.stream);
    };

    navigator.getUserMedia({video: true,}, (stream) =>{
      const video = document.querySelector('video#webCam-video-large');
      video.src = window.URL.createObjectURL(stream);
      pc.addStream(stream);
    }, e => console.error);

    const createOffer = (id) => {
      pc.createOffer((offer) => {
        pc.setLocationDescription(new sessionDescription(offer), () =>{
          socket.emit('make-offer', {
            offer,
            to: id,
          });
        }, e => console.error);
      });
    };

    socket.on('answer-made', (data) =>{
      pc.setRemoteDescription(new sessionDescription(data.answer), () =>{
        document.getElementById(data.socket).setAttribute('class', 'active');
        if(!answersFrom[data.socket]) {
          createOffer(data.socket);
          answersFrom[data.socket] = true;
        }
      }, e => console.error);
    });

    socket.on('offer-made', (data) => {
      offer = data.offer;

      pc.setRemoteDescription(new sessionDescription(data.offer), () =>{
        pc.createAnswer((answer) => {
          pc.setLocalDescription(new sessionDescription(answer), () =>{
            socket.emit('make-answer', {
              answer,
              to: data.socket,
            });
          }, e => console.error);
        }, e => console.error);
      });
    });

    socket.on('add-users', (data) => {
      console.log('Added a user');
      for (let i = 0; i < data.users.length; i++) {
        const el = document.createElement('div');
        const id = data.users[i];

        el.setAttribute('id', id);
        el.innerHTML = id;
        el.addEventListener('click', () => {
          createOffer(id);
        });
        document.getElementById('webCam-users').appendChild(el);
      }
    });

    socket.on('remove-user', (id) => {
      const div = document.getElementById(id);
      const users = document.getElementById('webCam-users');
    });
  }

  render() {
    return(
      <div className="webCam-container">
        <video className="webCam-video-large" id="webCam-video-large" autoPlay></video>
        <div className="users-container" id="webCam-usersContainer">
          <h4>Users</h4>
          <div className="webCam-users" id="webCam-users"></div>
        </div>
      </div>
    );
  }
}

export default WebCam;
