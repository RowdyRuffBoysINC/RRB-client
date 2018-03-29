import React, { Component, } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { connect, } from 'react-redux';
import { Editor, } from 'react-draft-wysiwyg';
import { socket, } from '../Room';

import './react-draft-wysiwyg.css';

class WordEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty(),};
  }

  onEditorStateChange(editorState) {
    this.setState({ editorState, });
    console.log('​--------------------------------------------------------------');
    console.log('​WordEditor -> onEditorStateChange -> editorState.FUNC', editorState.getCurrentContent());
    console.log('​--------------------------------------------------------------');
  }

  render() {
    const { editorState, } = this.state;
    console.log('​-------------------------------------------------');
    console.log('​WordEditor -> render -> editorState', editorState);
    console.log('​-------------------------------------------------');

    return (
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
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
