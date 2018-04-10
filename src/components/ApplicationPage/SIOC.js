import {socket,} from './Room';
import { trace, error, } from './WebCam/helpers';
import {
  setUserList,
  deleteUserFromList,
  setLocalUserStream,
  setRemoteUserStream,
  deleteRemoteUserStream,
} from '../../actions/Application';

export default class SIOC {
  constructor() {
    // AddedPerson keeps track of the user you requested video from
    this.addedPerson = null;

    // Need to use dispatch outside of init()
    this.dispatch = null;

    this.enableAudio = false;
    this.enableCamera = true;
    this.remoteVideo = null;
    this.localVideo = null;
    this.localVideoRef = null;
    this.pc = null;
    this.roomName = null;
    this.username = null;
    this.answersFrom = {};
    this.navigator = null;
    this.offer = null;
    this.sessionDescription = null;
    this.stunServer = 'stun:stun1.l.google.com:19302';

    this.setLocalVideoStream = null;
    this.setRemoteVideoStream = null;

    this._peerConnection = window.RTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.webkitRTCPeerConnection ||
      window.msRTCPeerConnection;


    this.pc = new this._peerConnection({'iceServers': [ {urls: this.stunServer,} , ],});


    this.sessionDescription = window.RTCSessionDescription ||
    window.mozRTCSessionDescription ||
    window.webkitRTCSessionDescription ||
    window.msRTCPeerConnection;

    navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
    this.navigator = navigator;
  }

  setStunServer(stun) {
    this.stunServer = stun;
  }

  getStunServer() {
    return this.stunServer;
  }

  createVideo(id) {
    this.pc.createOffer((offer) => {
      this.pc.setLocalDescription(new this.sessionDescription(offer), () => {
        socket.emit('make-offer', {
          offer,
          to: id,
          room: this.roomName,
          user: this.username,
        });
      }, error);
    }, error);
  }

  __createOffer(id) {
    this.pc.createOffer((offer) => {
      this.pc.setLocalDescription(new this.sessionDescription(offer), () =>{
        socket.emit('make-offer', {
          offer,
          to: id,
          room: this.roomName,
        });
      }, error);
    }, error);
  }

  answerMade() {
    socket.on('answer-made', (data) =>{
      const { socket, user, } = data;
      this.addedPerson = { socket, user, };

      this.pc.setRemoteDescription(new this.sessionDescription(data.answer), () => {
        /*
        This runs more than once; even though a valid answer comes back from a remote user the first time.
        Might produce issues in the future?
        */

        if(!this.answersFrom[data.socket]) {
          this.__createOffer(data.socket);
          this.answersFrom[data.socket] = true;
        }
      }, error);
    });
  }

  offerMade() {
    socket.on('offer-made', (data) => {
      const userSocket = data.socket;
      const user = data.user;

      this.addedPerson = {};
      this.addedPerson.user = user;
      this.addedPerson.socket = userSocket;


      this.offer = data.offer;
      this.pc.setRemoteDescription(new this.sessionDescription(data.offer), () =>{
        this.pc.createAnswer((answer) => {
          this.pc.setLocalDescription(new this.sessionDescription(answer), () =>{
            socket.emit('make-answer', {
              answer,
              to: data.socket,
              room: this.roomName,
              user: this.username,
            });
          }, error);
        }, error);
      }, error);
    });
  }

  addUsers(dispatch) {
    socket.on('add-users', (data) => {
      dispatch(setUserList(data.users));
    });
  }

  removeUsers(dispatch) {
    socket.on('remove-user', (id) => {
      dispatch(deleteUserFromList(id));
      dispatch(deleteRemoteUserStream(id));
    });
  }

  getLocalUserMedia() {
    this.navigator.getUserMedia({
      video: this.enableCamera,
      audio: this.enableAudio,
    }, (stream) => {
      this.dispatch(setLocalUserStream(stream));
      this.pc.addStream(stream);
    }, error);
  }

  init(props) {
    trace('Running SIOC.init');
    const { roomName, username, dispatch, setLocalVideoStream, setRemoteVideoStream, enableAudio = true, enableCamera = true, } = props;
    this.roomName = roomName;
    this.username = username;
    this.dispatch = dispatch;
    this.setLocalVideoStream = setLocalVideoStream;
    this.setRemoteVideoStream = setRemoteVideoStream;
    this.enableAudio = enableAudio;
    this.enableCamera = enableCamera;


    /*
    This gets triggered whenever an [answer was made] aka this.pc.setRemoteDescription(data.answer) in answerMade func
    also setRemoteDescription is in [offer was made] func
    */
    this.pc.onaddstream = (obj) => {
      dispatch(setRemoteUserStream(obj.stream, this.addedPerson));
    };

    // Wire socket events

    this.answerMade();
    this.offerMade();


    socket.emit('add-users', {
      room: roomName,
      user: username,
    });

    // Forgot what these did
    this.addUsers(dispatch);
    this.removeUsers(dispatch);
  }

  changeProps(props) {
    const { roomName, username, dispatch, setLocalVideoStream, setRemoteVideoStream, enableAudio, enableCamera, } = props;
    this.roomName = roomName;
    this.username = username;
    this.dispatch = dispatch;
    this.setLocalVideoStream = setLocalVideoStream;
    this.setRemoteVideoStream = setRemoteVideoStream;
    this.enableAudio = enableAudio;
    this.enableCamera = enableCamera;
  }
}
