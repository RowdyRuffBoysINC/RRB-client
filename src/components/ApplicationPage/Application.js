import React from 'react';
import { connect, } from 'react-redux';

import RequiresLogin from '../LandingPage/RequiresLogin';
import Room from './Room';
import RoomCreate from './RoomCreate';
import AppNavBar from './AppNavBar';


export class Dashboard extends React.Component {
  render() {
    const { match, } = this.props;
    if (match.url === '/dashboard') {
      return <RoomCreate />;
    }
    else {
      return (
        <section>
          <AppNavBar />
          <Room />
        </section>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.currentUser.username,
    name: `${state.auth.currentUser.firstName} ${state.auth.currentUser.lastName}`,
  };
};

export default RequiresLogin()(connect(mapStateToProps)(Dashboard));
