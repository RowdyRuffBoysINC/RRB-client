import React, { Component, } from 'react';
import { UnControlled as CodeMirror, } from 'react-codemirror2';
import { connect, } from 'react-redux';
import { socket, } from '../Room';

//Import Actions
import { setTheme, setMode, setTabSize, setLineNumbers, } from '../../../actions/Editor';

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

export class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { textContent: '', };
    socket.on('code msg sent back to clients', (msg) => {
      this.emitToClients(msg);
    });
  }

  emitToClients(textContent) {
    this.setState({ textContent, });
  }

  render() {
    const options = {
      lineNumbers: this.props.lineNumbers,
      mode: this.props.mode,
      theme: this.props.theme,
      tabSize: this.props.tabSize,
      lineWrapping: true,
    };
    return (
      <div className="App">
        <select onChange={(e) => {
          this.props.dispatch(setMode(e.target.value));
        }}>
          <option value="javascript">javascript</option>
          <option value="xml">html</option>
          <option value="ruby">ruby</option>
          <option value="swift">swift</option>
        </select>
        <select onChange={(e) => {
          this.props.dispatch(setTheme(e.target.value));
        }}>
          <option value="material">material</option>
          <option value="midnight">midnight</option>
          <option value="solarized">solarized</option>
          <option value="dracula">dracula</option>
          <option value="isotope">isotope</option>
        </select>
        <select onChange={(e) => {
          this.props.dispatch(setTabSize(e.target.value));
        }}>
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="8">8</option>
        </select>
        <select onChange={(e) => {
          this.props.dispatch(setLineNumbers(e.target.value));
        }}>
          <option value="true">Line numbers</option>
          <option value="false">No line numbers</option>
        </select>
        <CodeMirror
          value={this.state.textContent}
          options={options}
          onChange={(editor, data, value) => {
            this.setState({ textContent: value, });
          }}
          onKeyDown={(editor, event) => {
            socket.emit('code msg', {
              room: this.props.roomName,
              user: this.props.userName,
              msg: this.state.textContent,
            });
          }}
          onKeyUp={(editor, event) => {
            socket.emit('code msg', {
              room: this.props.roomName,
              user: this.props.userName,
              msg: this.state.textContent,
            });
          }} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.cmReducer.theme,
  mode: state.cmReducer.mode,
  tabSize: state.cmReducer.tabSize,
  lineNumbers: state.cmReducer.lineNumbers,
  username: state.auth.currentUser.username,
  roomName: state.applicationReducer.roomName,
});

export default connect(mapStateToProps)(CodeEditor);
