import {socket,} from '../Room';
import {trace, error,} from './helpers';

class SIOC {
  constructor(stunServer='stun:stun1.l.google.com:19302') {
    this.stunServer = stunServer;
    this.peerConnection = this._peerConnection();
    this.sessionDescription = this.sessionDescription();
    navigator.getUserMedia = this._navigator();
    this._createPeerConnection();
    this.navigator = navigator;

    this.pc = this._createPeerConnection();
    this.answersFrom = {};
    this.offer;
  }

  _peerConnection() {
    return window.RTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.webkitRTCPeerConnection ||
      window.msRTCPeerConnection;
  }

  _sesssionDescription() {
    return window.RTCSessionDescription ||
  window.mozRTCSessionDescription ||
  window.webkitRTCSessionDescription ||
  window.msRTCPeerConnection;
  }

  _navigator() {
    return navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
  }

  _createPeerConnection() {
    return new this.peerConnection({
      'iceServers': [
        {
          'iceServers':
          [ {urls: this.stunServer,} , ],
        }
        ,
      ],
    });
  }


  createVideo(id, roomName) {
    const answersFrom = {};
    let offer;

    this.pc.createOffer((offer) => {
      this.pc.setLocalDescription(new this.sessionDescription(offer), () =>{
        trace('Making an offer locally');
        socket.emit('make-offer', {
          offer,
          to: id,
          room: roomName,
        });
      }, error);
    }, error);
  }

  createOffer(id, roomName) {
    trace('Creating an offer');
    this.pc.createOffer((offer) => {
      this.pc.setLocalDescription(new this.sessionDescription(offer), () =>{
        trace('Making an offer locally');
        socket.emit('make-offer', {
          offer,
          to: id,
          room: roomName,
        });
      }, error);
    }), error;
  }
}
