import React from 'react';
import { connect, } from 'react-redux';

export class FirepadWordEditor extends React.Component {
  componentDidMount() {
    const firepadRef = window.firebase
      .database()
      .ref(`rooms/${this.props.roomName}/word`);
    const codeMirror = window
      .CodeMirror(document
        .getElementById('firepad'),
      { lineWrapping: true, });
    //Firepad not currently used but will be used in future.
    //eslint-disable-next-line
    const firepad = window.Firepad
      .fromCodeMirror(
        firepadRef,
        codeMirror, {
          richTextShortcuts: true,
          richTextToolbar: true,
        }
      );
  }

  render() {
    return (
      <div id="firepad" />
    );
  }
}

const mapStateToProps = state => ({ roomName: state.applicationReducer.roomName, });

export default connect(mapStateToProps)(FirepadWordEditor);
