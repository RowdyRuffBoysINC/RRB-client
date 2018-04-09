import React from 'react';
import { setEditorView, } from '../../actions/Editor';
import { setRoomView, } from '../../actions/Application';
import { connect, } from 'react-redux';
import './AppNavBar.css';

export function AppNavBar(props) {
  const editorViewArr = [ 'Code View', 'Doc View', 'Whiteboard View', ];

  const editorListItem = editorViewArr.map((view, index) => (
    <li key={index}
      className="editor-mode-text" href="#" onClick={() => props.dispatch(setEditorView(view))}>
      {view}
    </li>
  ));

  const editorNavigation = (
    <ul className="nav-bar-ul">
      {editorListItem}
      <li className="view-switch video" href="#" onClick={() => props.dispatch(setRoomView('video'))}>Audio</li>
      <li className="view-switch audio" href="#" onClick={() => props.dispatch(setRoomView('audio'))}>Video</li>
    </ul>
  );

  return (
    <section className="nav-bar-wrapper">
      {editorNavigation}
    </section>
  );
}

const mapStateToProps = (state) => {
  return {editorMode: state.applicationReducer.editorMode,};
};

export default connect(mapStateToProps)(AppNavBar);
