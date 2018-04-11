import React from 'react';
import { connect, } from 'react-redux';

export class FirepadWordEditor extends React.Component {
  componentDidMount() {
    const firepadRef = window.firebase.database().ref(`rooms/word/${this.props.roomName}`);
    const codeMirror = window.CodeMirror(document.getElementById('firepad'), { lineWrapping: true, });
    const firepad = window.Firepad.fromCodeMirror(firepadRef, codeMirror, {
      richTextShortcuts: true,
      richTextToolbar: true,
    });
    firepad.on('ready', () => console.log('ready and working!'));
  }

  render() {
    return (
      <div>
        <div id="firepad"></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  roomName: state.applicationReducer.roomName,
});

export default connect(mapStateToProps)(FirepadWordEditor);
