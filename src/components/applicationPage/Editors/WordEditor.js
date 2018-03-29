import React, { Component, } from 'react';
import { EditorState, convertFromRaw, convertToRaw, } from 'draft-js';
import { connect, } from 'react-redux';
import { Editor, } from 'react-draft-wysiwyg';
import { socket, } from '../Room';

import './react-draft-wysiwyg.css';
let t0 = 0;
let t1 = 0;
class WordEditor extends Component {
  constructor(props) {
    super(props);
    const content = { entityMap: {}, blocks: [ { key: '637gr', text: ' Initialized from content state.', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: [], data: {}, }, ], };

    this.state = { editorState: EditorState.createWithContent(convertFromRaw(content)),};

    socket.on('word msg sent back to clients', (msg) => {
      this.updateEditorWithSocketInfo(msg);
    });

  }

  componentDidMount() {
    // no given functions to listen keyEvents from react-draft-js
    document.querySelector('.wordEditorWrapper').addEventListener('click', () => { 
      console.log('click!');
      // t0 = performance.now();
      
      // Click events happen a couple milliseconds too early for fontsize/color/etc changes to register
      setTimeout(() => {
        console.log("click emit event!");
        socket.emit("word msg", {
          room: this.props.roomName,
          user: this.props.userName,
          msg: convertToRaw(this.state.editorState.getCurrentContent())
        });

        }, 100)
     });

    document.querySelector('.wordEditor').addEventListener('keydown', () => { 
      console.log('keydown!');

      socket.emit("word msg", {
        room: this.props.roomName,
        user: this.props.userName,
        msg: convertToRaw(this.state.editorState.getCurrentContent())
      });
     });

    document.querySelector('.wordEditor').addEventListener('keyup', () => { 
      console.log('keyup!'); 

      socket.emit("word msg", {
        room: this.props.roomName,
        user: this.props.userName,
        msg: convertToRaw(this.state.editorState.getCurrentContent())
      });
    });
  }

  onEditorStateChange(editorState) {
    this.setState({ editorState, });
    console.log('​--------------------------------------------------------------');
    console.log('​WordEditor -> onEditorStateChange -> editorState.FUNC', convertToRaw(editorState.getCurrentContent()));
    console.log('​--------------------------------------------------------------');
  }

  handleEditorRef(ref) {
  console.log('​------------------------------------------');
  console.log('​WordEditor -> handleEditorRef -> ref', ref);
  console.log('​------------------------------------------'); 

  }

  updateEditorWithSocketInfo = (msg) => {
    console.log('​-----------------------------------------------------');
    console.log('​WordEditor -> updateEditorWithSocketInfo -> msg', msg);
    console.log('​-----------------------------------------------------');
    this.setState({ editorState: EditorState.createWithContent(convertFromRaw(msg)),});
  }

  render() {
    const { editorState, } = this.state;
    console.log('​-------------------------------------------------');
    console.log('​WordEditor -> render -> editorState', editorState);
    console.log('​-------------------------------------------------');
    // t1 = performance.now();
    // console.log(t1 - t0, 'milliseconds');
    return (
      <Editor
        editorState={editorState}
        wrapperClassName="wordEditorWrapper"
        editorClassName="wordEditor"
        onEditorStateChange={editorState => this.onEditorStateChange(editorState)}
        editorRef={(ref) => this.handleEditorRef(ref)}
      />
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  roomName: state.applicationReducer.roomName,
});

export default connect(mapStateToProps)(WordEditor);

/*

Import React, { Component, } from 'react';
import { EditorState, convertFromRaw, convertToRaw, } from 'draft-js';
import { connect, } from 'react-redux';
import { Editor, } from 'react-draft-wysiwyg';
import { socket, } from '../Room';

import './react-draft-wysiwyg.css';

const content = {'entityMap': {},'blocks': [ {'key': '637gr','text': ' Initialized from content state.','type': 'unstyled','depth': 0,'inlineStyleRanges': [],'entityRanges': [],'data': {},} , ],};

class WordEditor extends Component {
  constructor(props) {
    super(props);

    this.state = { contentState: content, };

    socket.on('word msg sent back to clients', (msg) => {
      this.updateEditorWithSocketInfo(msg);
    });

    // no given functions to listen keyEvents from react-draft-js
    // document.body.addEventListener('keydown', () => console.log('keydown!'))
    // document.body.addEventListener('keyup', () => console.log('keyup!'))
  }

  onEditorStateChange(content) {
    console.log('​------------------------------------------------------');
    console.log('​WordEditor -> onEditorStateChange -> content', content);
    console.log('​------------------------------------------------------');

    this.setState({ contentState: content, });
  }

  updateEditorWithSocketInfo = (msg) => {
    console.log('​-----------------------------------------------------');
    console.log('​WordEditor -> updateEditorWithSocketInfo -> msg', msg);
    console.log('​-----------------------------------------------------');
  }

  render() {
    const { contentState, } = this.state;
    console.log('​-------------------------------------------------');
    console.log('​WordEditor -> render -> editorState', contentState);
    console.log('​-------------------------------------------------');

    return (
      <Editor
        contentState={this.state.contentState}
        wrapperClassName="wordEditorWrapper"
        editorClassName="wordEditor"
        onContentStateChange={content => this.onEditorStateChange(content)}
        handleReturn={(keyboardEvent, editorState ) => console.log('handleReturn', keyboardEvent, editorState)}
      />
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  roomName: state.applicationReducer.roomName,
});

export default connect(mapStateToProps)(WordEditor);


*/
