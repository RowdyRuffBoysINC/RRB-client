import React from 'react';
import { connect, } from 'react-redux';
import CodeEditor from './Editors/CodeEditor';
import WordEditor from './Editors/WordEditor';
import WhiteBoardEditor from './Editors/WhiteBoardEditor';
import { setEditorView, } from '../../actions/Editor';
import './EditorView.css';

export class EditorView extends React.Component {
  componentDidMount() { }

  render() {
    const editorViewArr = [ 'Code View', 'Doc View', 'Whiteboard View', ];

    const editorListItem = editorViewArr.map((view, index) => (
      <li key={index}
        className="editor-mode-text" href="#" onClick={() => this.props.dispatch(setEditorView(view))}>
        {view}
      </li>
    ));

    const editorViewToggle = (
      <section>
        <ul className="nav-bar-ul">
          {editorListItem}
        </ul>
      </section>
    );

    switch(this.props.editorMode) {
    case 'Doc View':
      return (
        <section>
          {editorViewToggle}
          <WordEditor />
        </section>
      );
    case 'Whiteboard View':
      return (
        <section>
          {editorViewToggle}
          <WhiteBoardEditor />
        </section>
      );
    default:
      return (
        <section>
          {editorViewToggle}
          <CodeEditor />
        </section>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.currentUser.username,
    name: `${state.auth.currentUser.firstName} ${state.auth.currentUser.lastName}`,
    editorMode: state.applicationReducer.editorMode,
  };
};

export default connect(mapStateToProps)(EditorView);
