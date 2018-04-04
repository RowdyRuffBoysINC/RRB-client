import React, { Component, } from 'react';
import { EditorState, convertFromRaw, convertToRaw, } from 'draft-js';
import { connect, } from 'react-redux';
import { Editor, } from 'react-draft-wysiwyg';
import { socket, } from '../Room';
import './ReactDraft.css';

class WordEditor extends Component {
  constructor(props) {
    super(props);
    const content = { entityMap: {}, blocks: [{ key: '637gr', text: ' Initialized from content state.', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: [], data: {}, },], };

    this.state = { editorState: EditorState.createWithContent(convertFromRaw(content)), };

    socket.on('word msg sent back to clients', (msg) => {
      this.updateEditorWithSocketInfo(msg);
    });

  }

  componentDidMount() {
    // No given functions to listen to keyEvents from react-draft-js
    document.querySelector('.rdw-editor-toolbar').addEventListener('click', () => {

      // Click events happen a couple milliseconds too early for fontsize/color/etc changes to register
      setTimeout(() => {

        socket.emit("word msg", {
          room: this.props.roomName,
          user: this.props.userName,
          msg: convertToRaw(this.state.editorState.getCurrentContent())
        });

      }, 100)
    });

    document.querySelector('.wordEditor').addEventListener('keydown', () => {

      socket.emit("word msg", {
        room: this.props.roomName,
        user: this.props.userName,
        msg: convertToRaw(this.state.editorState.getCurrentContent())
      });

    });

    document.querySelector('.wordEditor').addEventListener('keyup', () => {

      socket.emit("word msg", {
        room: this.props.roomName,
        user: this.props.userName,
        msg: convertToRaw(this.state.editorState.getCurrentContent())
      });

    });
  }

  onEditorStateChange(editorState) {
    this.setState({ editorState, });
  }

  updateEditorWithSocketInfo = (msg) => {
    this.setState({ editorState: EditorState.createWithContent(convertFromRaw(msg)), });
  }

  render() {
    const { editorState, } = this.state;

    return (
      <Editor
        editorState={editorState}
        wrapperClassName="wordEditorWrapper"
        editorClassName="wordEditor"
        onEditorStateChange={editorState => this.onEditorStateChange(editorState)}
      />
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  roomName: state.applicationReducer.roomName,
});

export default connect(mapStateToProps)(WordEditor);