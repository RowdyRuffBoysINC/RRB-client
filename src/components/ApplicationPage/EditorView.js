import React from 'react';
import { connect, } from 'react-redux';
import CodeEditor from './Editors/CodeEditor';
import WordEditor from './Editors/WordEditor';
import WhiteBoardEditor from './Editors/WhiteBoardEditor';
import { setEditorView, } from '../../actions/Editor';
import './EditorView.css';

export function EditorView(props) {
  const editorViewArr = [ 'Code View', 'Doc View', 'Whiteboard View', ];

  const editorListItem = editorViewArr.map((view, index) => (
    <li key={index}
      className="editor-mode-text" href="#" onClick={() => props.dispatch(setEditorView(view))}>
      {view}
    </li>
  ));

  const editorNavigation = (
    <section>
      <ul className="nav-bar-ul">
        {editorListItem}
      </ul>
    </section>
  );

  const editorViewToggle = (view) => {
    switch (view) {
    case 'Doc View':
      return <WordEditor />;
    case 'Whiteboard View':
      return <WhiteBoardEditor />;
    default:
      return <CodeEditor />;
    }
  };

  return (
    <section className="editor-view-wrapper">
      {editorNavigation}
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
