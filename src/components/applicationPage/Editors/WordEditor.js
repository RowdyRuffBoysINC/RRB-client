import React, { Component, } from 'react';
import { EditorState, convertFromRaw, convertToRaw, } from 'draft-js';
import { connect, } from 'react-redux';
import { Editor, } from 'react-draft-wysiwyg';
import { socket, } from '../Room';

import './react-draft-wysiwyg.css';
const content = {'entityMap': {},'blocks': [ {'key': '637gr','text': 'Initialized from content state.','type': 'unstyled','depth': 0,'inlineStyleRanges': [],'entityRanges': [],'data': {},} ,],};

class WordEditor extends Component {
  constructor(props) {
    super(props);
    this.blockTemp = [ {'key': '637gr','text': 'blockTemp','type': 'unstyled','depth': 0,'inlineStyleRanges': [],'entityRanges': [],'data': {},} , ];
    this.state = { contentState: content, };
  }

  onEditorStateChange(content) {
    console.log('​------------------------------------------------------');
    // Console.log("​WordEditor -> onEditorStateChange -> content", convertToRaw(content));
    console.log('​WordEditor -> onEditorStateChange -> content', content);
    console.log('​------------------------------------------------------');

    this.setState({ contentState: content, });
  }

  render() {
    const { contentState, } = this.state;
    console.log('​-------------------------------------------------');
    console.log('​WordEditor -> render -> editorState', contentState);
    console.log('​-------------------------------------------------');

    return (
      <Editor
        contentState={this.state.contentState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onContentStateChange={content => this.onEditorStateChange(content)}
      />
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  roomName: state.applicationReducer.roomName,
});

export default connect(mapStateToProps)(WordEditor);
