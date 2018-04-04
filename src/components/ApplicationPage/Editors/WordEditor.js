import React, { Component, } from 'react';
import { EditorState, convertFromRaw, convertToRaw, } from 'draft-js';
import { connect, } from 'react-redux';
import { Editor, } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//Any classes from react-draft imports in event listeners are prebuilt names 
import { socket, } from '../Room';
import { setWordEditorText, } from '../../../actions/Editor';


class WordEditor extends Component {
  constructor(props) {
    super(props);

    socket.on('word msg sent back to clients', (msg) => {
      this.updateEditorWithSocketInfo(msg);
    });
  }

  componentDidMount() {

    // No given functions to listen to keyEvents from react-draft-js

    document.querySelector('.rdw-editor-toolbar').addEventListener('click', () => {
      // Click events happen a couple milliseconds too early for fontsize/color/etc changes to register
      setTimeout(() => {
        this.emitWordMsg();
      }, 100)
    });

    this.addListenerAndEmit('keydown');
    this.addListenerAndEmit('keyup');
  }

  addListenerAndEmit(listenFor) {
    document.querySelector('.js-word-editor').addEventListener(listenFor, () => {
    this.emitWordMsg();
    });
  }

  emitWordMsg() {
    socket.emit("word msg", {
      room: this.props.roomName,
      user: this.props.userName,
      msg: convertToRaw(this.props.wordEditorText.getCurrentContent())
    });
  }

  onEditorStateChange(editorState) {
    this.props.dispatch(setWordEditorText(editorState));
  }

  updateEditorWithSocketInfo = (msg) => {
    const convertedMsg = EditorState.createWithContent(convertFromRaw(msg));
    this.props.dispatch(setWordEditorText(convertedMsg));
  }

  render() {
    const { wordEditorText, } = this.props;

    return (
      <Editor
        editorState={wordEditorText}
        wrapperClassName="word-editor-wrapper"
        editorClassName="js-word-editor"
        onEditorStateChange={editorState => this.onEditorStateChange(editorState)}
      />
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  roomName: state.applicationReducer.roomName,
  wordEditorText: state.editorReducer.wordEditorText
});

export default connect(mapStateToProps)(WordEditor);
