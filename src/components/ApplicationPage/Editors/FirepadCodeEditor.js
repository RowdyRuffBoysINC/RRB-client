import React from 'react';
import { connect, } from 'react-redux';
import { setTheme, setMode, setTabSize, setLineNumbers, } from '../../../actions/Editor';
import './Firepad.css';

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

export class FirepadCodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.firepadRef = window.firebase.database().ref(`rooms/${this.props.roomName}/code`);
    this.firepad;
    this.codeMirror;
  }

  componentDidMount() {
    // const firepadRef = window.firebase.database().ref(`rooms/${this.props.roomName}/code`);
    this.codeMirror = window.CodeMirror(document.getElementById('firepad'), {
      lineWrapping: true,
      lineNumbers: this.props.lineNumbers,
      mode: this.props.mode,
      theme: this.props.theme,
      tabSize: this.props.tabSize,
    });
    this.firepad = window.Firepad.fromCodeMirror(this.firepadRef, this.codeMirror, {defaultText: 'Hello World',});
    // firepad.on('ready', () => console.log('FirepadCodeEditor ready and working!'));
  }

  componentDidUpdate() {
    console.log(this.codeMirror);
    this.codeMirror = window.CodeMirror(document.getElementById('firepad'), {
      lineWrapping: true,
      lineNumbers: this.props.lineNumbers,
      mode: this.props.mode,
      theme: this.props.theme,
      tabSize: this.props.tabSize,
    });
    this.firepad = window.Firepad.fromCodeMirror(this.firepadRef, this.codeMirror, {defaultText: 'Hello World',});
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
      <select onChange={(e) => {
        this.props.dispatch(func(e.target.value));
      }}>
        {this.renderOptions(option)}
      </select>
    );
  }

  render() {
    const modeOptions = [ 'javascript', 'xml', 'ruby', 'swift', ];
    const themeOptions = [ 'material', 'midnight', 'solarized', 'dracula', 'isotope', ];
    const tabSizeOptions = [ 2, 4, 8, ];

    return (
      <section className="code-editor-wrapper">
        {this.renderSelect(setMode, modeOptions)}
        {this.renderSelect(setTheme, themeOptions)}
        {this.renderSelect(setTabSize, tabSizeOptions)}
        <select onChange={(e) => {
          this.props.dispatch(setLineNumbers(e.target.value));
        }}>
          <option value="true">Line numbers</option>
          <option value="false">No line numbers</option>
        </select>
        <div id="firepad"></div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  roomName: state.applicationReducer.roomName,
  theme: state.editorReducer.theme,
  mode: state.editorReducer.mode,
  tabSize: state.editorReducer.tabSize,
  lineNumbers: state.editorReducer.lineNumbers,
});

export default connect(mapStateToProps)(FirepadCodeEditor);
