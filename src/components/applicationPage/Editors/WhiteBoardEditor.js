import React from 'react';
import { connect, } from 'react-redux';

export class WhiteBoardEditor extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <section>
        <h3> Whiteboard </h3>
      </section>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    protectedData: state.protectedData.data
  };
};

export default connect(mapStateToProps)(WhiteBoardEditor);