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
      </section>
    );
  }
}

const mapStateToProps = (state) => {

};

export default connect(mapStateToProps)(EditorView);

// <WordEditor />
// <WhiteBoardEditor />