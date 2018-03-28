import React from 'react';
import { connect, } from 'react-redux';
import CodeEditor from './Editors/CodeEditor';
import WordEditor from './Editors/WordEditor';
import WhiteBoardEditor from './Editors/WhiteBoardEditor';
import { setEditorView } from '../../actions/editor';
import './EditorView.css';

export class EditorView extends React.Component {
  componentDidMount() { }

  render() {

    let editorViewToggle = (
      <div>
        <ul className="nav-bar-ul">
          <li className="editor-mode-text" href="#" onClick={() => this.props.dispatch(setEditorView('CodeEditor'))}>
            Code View
      </li>
          <li className="editor-mode-text" href="#" onClick={() => this.props.dispatch(setEditorView('WordEditor'))}>
            Doc View
      </li>
          <li className="editor-mode-text" href="#" onClick={() => this.props.dispatch(setEditorView('WhiteBoardEditor'))}>
            Whiteboard View
      </li>
        </ul>
      </div>
    );

    if (this.props.editorMode === 'WordEditor') {
      return (
        <section>
          {editorViewToggle}
          <WordEditor />
        </section>
      );
    }
    else if (this.props.editorMode === 'WhiteBoardEditor')
      return (
        <section>
          {editorViewToggle}
          <WhiteBoardEditor />
        </section>
      );
    else return (
      <section>
        {editorViewToggle}
        <CodeEditor />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { currentUser, } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    protectedData: state.protectedData.data,
    editorMode: state.applicationReducer.editorMode,
  };
};

export default connect(mapStateToProps)(EditorView);
