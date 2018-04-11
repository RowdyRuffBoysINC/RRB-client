import React from 'react';
import { connect, } from 'react-redux';

import CodeEditor from './Editors/CodeEditor';
import WordEditor from './Editors/WordEditor';
import WhiteBoardEditor from './Editors/WhiteBoardEditor';
import FirepadWordEditor from '../FirepadWordEditor';
import FirepadCodeEditor from '../FirepadCodeEditor';
import './EditorView.css';

export function EditorView(props) {
  const editorViewToggle = (view) => {
    switch (view) {
    case 'Doc View':
      return <FirepadWordEditor />;
    case 'Whiteboard View':
      return <WhiteBoardEditor />;
    default:
      return <FirepadCodeEditor />;
    }
  };

  return (
    <section className="editor-view-wrapper">
      <div className="main-editor-wrapper">
        {editorViewToggle(props.editorMode)}
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.currentUser.username,
    name: `${state.auth.currentUser.firstName} ${state.auth.currentUser.lastName}`,
    editorMode: state.applicationReducer.editorMode,
  };
};

export default connect(mapStateToProps)(EditorView);
