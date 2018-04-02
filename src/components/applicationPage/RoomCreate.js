import React from 'react';
import { connect, } from 'react-redux';
import requiresLogin from '../requires-login';
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
      <section>
        <h1> Room Create </h1>
        <input type='text' placeholder='Room Name Please!' onChange={(e) => handleOnChange(e)} />
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

export default withRouter(requiresLogin()(connect(mapStateToProps)(Dashboard)));
