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

  handleClick() {
    this.props.history.push(`/dashboard/${this.props.roomName}`);
  }

  render() {

    return (
      <section className="room-create">
        <h1> Room Create </h1>
        <input type="text" placeholder="Enter your room name!" onChange={e => this.handleOnChange(e)} />
        <button onClick={e => this.handleClick(e)}> Submit </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.currentUser.username,
    name: `${state.auth.currentUser.firstName} ${state.auth.currentUser.lastName}`,
    roomName: state.applicationReducer.roomName,
  };
};

export default withRouter(RequiresLogin()(connect(mapStateToProps)(RoomCreate)));
