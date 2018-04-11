import React from 'react';
import { setTheme, setMode, setTabSize, setLineNumbers, } from '../../../actions/Editor';
import './Firepad.css';

export class Firepad extends React.Component {
  constructor(props) {
    super(props);
    this.firepad;
  }

  componentDidMount() {
    this.firepad = window.Firepad.fromCodeMirror(this.props.firepadRef, this.props.codeMirror, {defaultText: 'Hello World',});
  }

  render() {
    return (
      <section className="code-editor-wrapper">
        <div id="firepad"></div>
      </section>
    );
  }
}

export default Firepad;
