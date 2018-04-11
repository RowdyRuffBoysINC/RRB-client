import React from 'react';
import { connect, } from 'react-redux';

export class FirepadEditor extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyBZMhhatyllvgrOwuVWulM7wf_Ctzjz6gk',
      authDomain: 'crossshare-2645f.firebaseapp.com',
      databaseURL: 'https://crossshare-2645f.firebaseio.com',
      projectId: 'crossshare-2645f',
      storageBucket: '',
      messagingSenderId: '112633651653',
    };
    if(!window.firebase.apps.length) {
      window.firebase.initializeApp(config);
    }
  }
  componentDidMount() {
    const firepadRef = window.firebase.database().ref(`rooms/${this.props.room}`);
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
        <div>testing </div>
        <div id="firepad"></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  roomName: state.applicationReducer.roomName,
});

export default connect(mapStateToProps)(FirepadEditor);
