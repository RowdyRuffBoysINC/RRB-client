import React from 'react';
import { connect, } from 'react-redux';
import CodeEditor from './Editors/CodeEditor';
import WordEditor from './Editors/WordEditor';
import WhiteBoardEditor from './Editors/WhiteBoardEditor';

export class EditorView extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <section>
        <CodeEditor />
        <h3>Google Docs </h3>
        <h3> Whiteboard </h3>
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
