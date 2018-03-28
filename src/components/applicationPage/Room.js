import React from 'react';
import { connect, } from 'react-redux';
import io from 'socket.io-client';
import EditorView from './EditorView';
export const socket = io();

export class Room extends React.Component {
  componentDidMount() {
    socket.emit('join room', {room: this.props.roomName, user: this.props.username});
  }

  componentWillUnmount() {
    socket.emit('leave room', {room: this.props.roomName, user: this.props.username});
  }

  render() {
    return (
      <section>
        <EditorView />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.auth.currentUser.username,
  roomName: state.applicationReducer.roomName,
});

export default connect(mapStateToProps)(Room);
