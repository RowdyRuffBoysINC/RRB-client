import React from 'react';
import { UnControlled as CodeMirror, } from 'react-codemirror2';
import { connect, } from 'react-redux';
import { socket, } from '../Room';
import { SketchField, Tools } from "react-sketch";

export class WhiteBoardEditor extends React.Component {
  componentDidMount() { }

  render() {
    return (
      <section>
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
    roomName: state.applicationReducer.roomName,
  };
};

export default connect(mapStateToProps)(WhiteBoardEditor);
