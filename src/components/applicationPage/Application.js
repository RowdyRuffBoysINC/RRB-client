import React from 'react';
import { connect, } from 'react-redux';
import requiresLogin from '../requires-login';
import { fetchProtectedData, } from '../../actions/protected-data';

//Import Child Components
import Room from './Room';
import RoomCreate from './RoomCreate';

export class Dashboard extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

  render() {

    const { match, } = this.props;

    if (match.url === '/dashboard') {
      return <RoomCreate />;
    }

    else {
      return <Room />;
    }
  }
}

const mapStateToProps = (state) => {
  const { currentUser, } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    protectedData: state.protectedData.data,
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));