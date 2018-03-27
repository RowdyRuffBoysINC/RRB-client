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

  // If route=http://localhost:3000/dashboard/, render state that asks what room you want

  // Else render everything as normal, with Room component taking correct props.
  render() {

    const { match, location, history, staticContext, dispatch } = this.props;

    if (match.url === '/dashboard') {
      // show roomCreate

      console.log(match);
      return <RoomCreate />;
    }

    else {
      // show room w/ roomName & other redux props/etc
      return <Room />;
    }

    
    return (
      <section>
        <Room />
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
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));


// <div className="dashboard">
//   <div className="dashboard-username">
//     Username: {this.props.username}
//   </div>
//   <div className="dashboard-name">Name: {this.props.name}</div>
//   <div className="dashboard-protected-data">
//     Protected data: {this.props.protectedData}
//   </div>
// </div>
