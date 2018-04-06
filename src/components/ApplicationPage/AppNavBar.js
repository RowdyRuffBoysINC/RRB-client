import React from 'react';
import { setEditorView, } from '../../actions/Editor';
import { connect, } from 'react-redux';

export function AppNavBar(props) {
  const editorViewArr = [ 'Code View', 'Doc View', 'Whiteboard View', ];

  const editorListItem = editorViewArr.map((view, index) => (
    <li key={index}
      className="editor-mode-text" href="#" onClick={() => props.dispatch(setEditorView(view))}>
      {view}
    </li>
  ));

  const editorNavigation = (
    <section className="nav-bar-wrapper">
      <ul className="nav-bar-ul">
        {editorListItem}
      </ul>
    </section>
  );
  return (
    <section className="chat-wrapper">
      {editorNavigation}
    </section>
  );
}

const mapStateToProps = (state) => {
  return {editorMode: state.applicationReducer.editorMode,};
};

export default connect(mapStateToProps)(AppNavBar);
