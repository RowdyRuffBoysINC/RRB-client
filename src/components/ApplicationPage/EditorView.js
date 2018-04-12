import React from 'react';
import { connect, } from 'react-redux';

import WhiteBoardEditor from './Editors/WhiteBoardEditor';
import FirepadWordEditor from './Editors/FirepadWordEditor';
import FirepadCodeEditor from './Editors/FirepadCodeEditor';
import './EditorView.css';
//Add comment
export function EditorView(props) {
  const editorViewToggle = (view) => {
    switch (view) {
    case 'Doc':
      return <FirepadWordEditor />;
    case 'Whiteboard':
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
