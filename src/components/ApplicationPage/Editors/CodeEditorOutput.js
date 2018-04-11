import React from 'react';
import { connect, } from 'react-redux';

export function CodeEditorOutput(props) {
  return (
    <section className="editor-output-wrapper">
      Console log output goes somewhere here!
    </section>
  );
}

const mapStateToProps = (state) => {
  return {username: state.auth.currentUser.username,};
};

export default connect(mapStateToProps)(CodeEditorOutput);
