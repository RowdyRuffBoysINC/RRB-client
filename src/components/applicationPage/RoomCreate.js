import React from 'react';
import { connect, } from 'react-redux';
import requiresLogin from '../requires-login';
import { withRouter } from 'react-router'
import { setCreateInput } from '../../actions/application';

export class Dashboard extends React.Component {
  handleOnChange = (e) => {
    const input = e.target.value;
    this.props.dispatch(setCreateInput(input));
  }

  handleClick = () => {
    this.props.history.push(`/dashboard/${this.props.roomName}`);
  }

  render() {
    const { handleOnChange, handleClick } = this;

    return (
      <section className="room-create">
        <h1> Room Create </h1>
        <input type='text' placeholder='Enter your room name!' onChange={(e) => handleOnChange(e)} />
        <button onClick={handleClick}> Submit </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.currentUser.username,
    name: `${state.auth.currentUser.firstName} ${state.auth.currentUser.lastName}`,
    protectedData: state.protectedData.data,
    roomName: state.applicationReducer.roomName
  };
};

export default withRouter(requiresLogin()(connect(mapStateToProps)(Dashboard)));
