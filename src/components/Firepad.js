import React from 'react';
import * as firebase from 'firebase';
import Firepad from 'firepad';
import { UnControlled as CodeMirror, } from 'react-codemirror2';

export class FirepadEditor extends React.Component {
  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyBZMhhatyllvgrOwuVWulM7wf_Ctzjz6gk',
        authDomain: 'crossshare-2645f.firebaseapp.com',
        databaseURL: 'https://crossshare-2645f.firebaseio.com',
        projectId: 'crossshare-2645f',
        storageBucket: '',
        messagingSenderId: '112633651653',
      });
    }
    const firepadRef = firebase.database().ref();
    const codeMirror = window.CodeMirror(document.getElementById('firepad'), { lineWrapping: true });
    const firepad = window.Firepad.fromCodeMirror(firepadRef, CodeMirror, {
      richTextShortcuts: true,
      richTextToolbar: true,
      defaultText: 'Hello, World!',
    });
  }

  // componentDidMount() {
  //   this.firepad.on('ready', () => console.log('ready'));
  // }

  render() {
    return (
      <div>
        <div>testing </div>
        <div id="firepad"></div>
      </div>
    );
  }
}

export default FirepadEditor;
