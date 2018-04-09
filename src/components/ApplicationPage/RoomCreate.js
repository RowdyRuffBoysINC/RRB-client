import React from 'react';
import { connect, } from 'react-redux';
import { withRouter, } from 'react-router';

import RequiresLogin from '../LandingPage/RequiresLogin';
import { setCreateInput, } from '../../actions/Application';
import './RoomCreate.css';

export function RoomCreate(props) {
  function handleOnChange(e) {
    const input = e.target.value;
    props.dispatch(setCreateInput(input));
  }

  function handleClick() {
    props.history.push(`/dashboard/${props.roomName}`);
  }

  return (
    <section className="room-create">
      <div className="room-create-wrapper">
        <h1 className="room-create-header"> Create a Room </h1>
        <input className="room-create-input" type="text" placeholder="Room Name..." onChange={e => handleOnChange(e)} />
        <button className="btn-form btn-room" onClick={e => handleClick(e)}> Submit </button>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.currentUser.username,
    name: `${state.auth.currentUser.firstName} ${state.auth.currentUser.lastName}`,
    roomName: state.applicationReducer.roomName,
  };
};

export default withRouter(RequiresLogin()(connect(mapStateToProps)(RoomCreate)));
