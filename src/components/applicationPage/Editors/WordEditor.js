import React, { Component, } from 'react';
import { EditorState, } from "draft-js";
import { connect } from 'react-redux';
import { Editor, } from 'react-draft-wysiwyg';
import { socket, } from '../Room';

import './react-draft-wysiwyg.css';

class WordEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({ editorState, });
  }

  render() {
    const { editorState, } = this.state;
    return (
      <Editor
        value={this.state.textContent}
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={this.onEditorStateChange}
      />
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  roomName: state.applicationReducer.roomName,
})

export default connect(mapStateToProps)(WordEditor);
