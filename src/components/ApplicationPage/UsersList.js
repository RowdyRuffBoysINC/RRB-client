import React from 'react';
import { connect, } from 'react-redux';

export class UsersList extends React.Component {
  createList(users) {
    return users.map((aUser) => {
      const { id, user, } = aUser;

      return (<li onClick={() => this.props.createOffer(id)} key={id}> Share your screen with {user} </li>);
    });
  }

  render() {
    const list = this.createList(this.props.userList);

    return (<ul>{list}</ul>);
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.currentUser.username,
    name: `${state.auth.currentUser.firstName} ${state.auth.currentUser.lastName}`,
    userList: state.applicationReducer.listOfUsers,
  };
};

export default connect(mapStateToProps)(UsersList);
