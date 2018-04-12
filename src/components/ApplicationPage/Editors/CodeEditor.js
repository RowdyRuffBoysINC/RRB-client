import React from 'react';
import { UnControlled as CodeMirror, } from 'react-codemirror2';
import { connect, } from 'react-redux';

import { socket, } from '../Room';
import CodeEditorOutput from './CodeEditorOutput';


//Import Actions
import { setTheme, setMode, setTabSize, setLineNumbers, setCodeEditorText, } from '../../../actions/Editor';

//Import Themes
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/midnight.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/isotope.css';

//Import Code Options
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/ruby/ruby.js';
import 'codemirror/mode/swift/swift.js';
import 'codemirror/mode/xml/xml.js';

export class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    socket.on('code msg sent back to clients', (msg) => {
      this.updateCodeEditorWithSocketInfo(msg);
    });
  }

  updateCodeEditorWithSocketInfo(info) {
    this.props.dispatch(setCodeEditorText(info));
  }

  emitCodeMsg() {
    socket.emit('code msg', {
      room: this.props.roomName,
      user: this.props.userName,
      msg: this.props.codeEditorText,
    });
  }

  renderOptions(array) {
    return array.map((option, index) => {
      return (
        <option value={option} key={index}>{option}</option>
      );
    });
  }

  renderSelect(func, option) {
    return (
      <select className="code-select" onChange={(e) => {
        this.props.dispatch(func(e.target.value));
      }}>
        {this.renderOptions(option)}
      </select>
    );
  }

  render() {
    const options = {
      lineNumbers: this.props.lineNumbers,
      mode: this.props.mode,
      theme: this.props.theme,
      tabSize: this.props.tabSize,
      lineWrapping: true,
    };
    const modeOptions = [ 'Language', 'javascript', 'xml', 'ruby', 'swift', ];
    const themeOptions = [ 'Theme', 'material', 'midnight', 'solarized', 'dracula', 'isotope', ];
    const tabSizeOptions = [ 'Tab size', 2, 4, 8, ];

    return (
      <section className="code-editor-wrapper">
        {this.renderSelect(setMode, modeOptions)}
        {this.renderSelect(setTheme, themeOptions)}
        {this.renderSelect(setTabSize, tabSizeOptions)}
        <select className="code-select" onChange={(e) => {
          this.props.dispatch(setLineNumbers(e.target.value));
        }}>
          <option value="true">Line numbers</option>
          <option value="false">No line numbers</option>
        </select>
        <CodeMirror
          value={this.props.codeEditorText}
          options={options}
          onChange={(editor, data, value) => {
            this.props.dispatch(setCodeEditorText(value));
          }}
          onKeyDown={() => this.emitCodeMsg()}
          onKeyUp={() => this.emitCodeMsg()} />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.editorReducer.theme,
  mode: state.editorReducer.mode,
  tabSize: state.editorReducer.tabSize,
  lineNumbers: state.editorReducer.lineNumbers,
  username: state.auth.currentUser.username,
  roomName: state.applicationReducer.roomName,
  codeEditorText: state.editorReducer.codeEditorText,
});

export default connect(mapStateToProps)(CodeEditor);


//Kept editor output for when we need it <CodeEditorOutput />
