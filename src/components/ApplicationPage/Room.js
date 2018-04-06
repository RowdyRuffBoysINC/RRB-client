import './Room.css';
import React from 'react';
import { connect, } from 'react-redux';
import io from 'socket.io-client';
import { withRouter, } from 'react-router';
import EditorView from './EditorView';
import { setCreateInput, } from '../../actions/Application';
import { fetchDocsFromDb, updateDocsDb, createDocsDb, } from '../../actions/Editor';
import { API_BASE_URL, } from '../../config';
import WebCam from './WebCam';
export const socket = io(API_BASE_URL);


export class Room extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchDocsFromDb(this.props.match.params.roomName))
      .then((value) => {
        if (value === false) {
          this.props.dispatch(createDocsDb({
            roomName: this.props.roomName,
            codeEditorText: this.props.codeEditorText,
            wordEditorText: this.props.wordEditorText,
            whiteBoardEditorText: this.props.whiteBoardEditorText,    
          }));
        }
      });
  }

  componentDidMount() {
    this.props.dispatch(setCreateInput(this.props.match.params.roomName));
    socket.emit('join room', { room: this.props.match.params.roomName, user: this.props.username, });
    this.interval = setInterval(() => {
      this.props.dispatch(updateDocsDb({
        roomName: this.props.roomName,
        codeEditorText: this.props.codeEditorText,
        wordEditorText: this.props.wordEditorText,
        whiteBoardEditorText: this.props.whiteBoardEditorText,
      }));
    }, 5000);
  }

  componentWillUnmount() {
    socket.emit('leave room', { room: this.props.match.params.roomName, user: this.props.username, });
    clearInterval(this.interval);
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
  codeEditorText: state.editorReducer.codeEditorText,
  wordEditorText: state.editorReducer.wordEditorText,
  whiteBoardEditorText: state.editorReducer.whiteBoardEditorText,
});

export default withRouter((connect)(mapStateToProps)(Room));
