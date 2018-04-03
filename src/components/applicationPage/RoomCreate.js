import React from 'react';
import { connect, } from 'react-redux';
import RequiresLogin from '../LandingPage/RequiresLogin';
import { withRouter } from 'react-router'
import { setCreateInput } from '../../actions/application';

export class Dashboard extends React.Component {

  componentDidMount() {
    // this.props.dispatch();
  }

  handleOnChange = (e) => {
    const input = e.target.value;
    this.props.dispatch(setCreateInput(input));
  }

  handleClick = () => {
    this.props.history.push(`/dashboard/${this.props.roomName}`);
  }

  render() {
    const { match, location, history, staticContext, dispatch } = this.props;
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
  const { currentUser, } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    protectedData: state.protectedData.data,
    roomName: state.applicationReducer.roomName
  };
};

export default withRouter(RequiresLogin()(connect(mapStateToProps)(Dashboard)));
