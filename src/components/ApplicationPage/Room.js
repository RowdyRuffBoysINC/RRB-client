import './Room.css';
import React from 'react';
import { connect, } from 'react-redux';
import io from 'socket.io-client';
import { withRouter, } from 'react-router';
import EditorView from './EditorView';
import SIOC from './SIOC';
import WebCam from './WebCam';
import { setCreateInput, deleteLocalUserStream, setCreateVideoFunc, } from '../../actions/Application';
import { API_BASE_URL, } from '../../config';
export const socket = io(API_BASE_URL);


export class Room extends React.Component {
  constructor(props) {
    super(props);
    this.SIOC = new SIOC();
  }

  componentWillMount() {
    this.SIOC.init(this.props);
    this.props.dispatch(setCreateInput(this.props.match.params.roomName));
    this.props.dispatch(setCreateVideoFunc(id => this.SIOC.createVideo(id)));

    socket.emit('join room', { room: this.props.match.params.roomName, user: this.props.username, });
  }

  componentDidMount() {
    this.SIOC.getLocalUserMedia();
  }

  componentWillUnmount() {
    socket.emit('leave room', { room: this.props.match.params.roomName, user: this.props.username, });

    this.props.dispatch(deleteLocalUserStream());
  }

  render() {
    return (
      <section className="room">
        <EditorView className="editors" />
        <WebCam className="webcam" />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  roomName: state.applicationReducer.roomName,
});

export default withRouter((connect)(mapStateToProps)(Room));
