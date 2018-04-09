import React from 'react';
import { connect, } from 'react-redux';
import io from 'socket.io-client';
import { withRouter, } from 'react-router';
import { convertToRaw, } from 'draft-js';

import EditorView from './EditorView';
import { setCreateInput, } from '../../actions/Application';
import { fetchDocsFromDb, updateDocsDb, createDocsDb, } from '../../actions/Editor';
import { API_BASE_URL, } from '../../config';
import WebCam from './WebCam';
import Chat from './Chat';
import './Room.css';


export const socket = io(API_BASE_URL);

export class Room extends React.Component {
  componentWillMount() {
    // If false is returned from GET, create new doc instead of updating
    this.props.dispatch(fetchDocsFromDb(this.props.match.params.roomName))
      .then((value) => {
        if (value === false) {
          this.props.dispatch(createDocsDb({
            roomName: this.props.roomName,
            codeEditorText: this.props.codeEditorText,
            wordEditorText: convertToRaw(this.props.wordEditorText.getCurrentContent()),
            whiteBoardEditorText: this.props.whiteBoardEditorText,
          }));
        }
      });
  }

  componentDidMount() {
    this.props.dispatch(setCreateInput(this.props.match.params.roomName));
    socket.emit('join room', { room: this.props.match.params.roomName, user: this.props.username, });
    // Update docs every x seconds
    this.interval = setInterval(() => {
      this.props.dispatch(updateDocsDb({
        roomName: this.props.roomName,
        codeEditorText: this.props.codeEditorText,
        wordEditorText: convertToRaw(this.props.wordEditorText.getCurrentContent()),
        whiteBoardEditorText: this.props.whiteBoardEditorText,
      }));
    }, 3000);
  }

  componentWillUnmount() {
    socket.emit('leave room', { room: this.props.match.params.roomName, user: this.props.username, });
    clearInterval(this.interval);
  }

  render() {
    let webCam;

    if (this.props.roomView === 'video') {
      webCam = <WebCam className="webcam" />;
    }

    return (
      <section className="room">
        <div className="left-side-wrapper">
          <EditorView className="editors" />
        </div>
        <div className="right-side-wrapper">
          {webCam}
          <Chat className="chat" />
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  roomName: state.applicationReducer.roomName,
  roomView: state.applicationReducer.roomView,
  codeEditorText: state.editorReducer.codeEditorText,
  wordEditorText: state.editorReducer.wordEditorText,
  whiteBoardEditorText: state.editorReducer.whiteBoardEditorText,
});

export default withRouter((connect)(mapStateToProps)(Room));
