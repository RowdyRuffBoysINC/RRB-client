import React from 'react';
import { connect, } from 'react-redux';
import RequiresLogin from '../LandingPage/RequiresLogin';
import { withRouter, } from 'react-router';
import { setCreateInput, } from '../../actions/Application';

export function RoomCreate (props) {

  function handleOnChange (e) {
    const input = e.target.value;
    props.dispatch(setCreateInput(input));
  }

  function handleClick () {
    props.history.push(`/dashboard/${props.roomName}`);
  }

  return (
    <section className="room-create">
      <h1> Room Create </h1>
      <input type="text" placeholder="Enter your room name!" onChange={e => handleOnChange(e)} />
      <button onClick={handleClick}> Submit </button>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.currentUser.username,
    name: `${state.auth.currentUser.firstName} ${state.auth.currentUser.lastName}`,
    roomName: state.applicationReducer.roomName
  };
};

export default withRouter(RequiresLogin()(connect(mapStateToProps)(RoomCreate)));
