import React from 'react';
import { connect, } from 'react-redux';

export class UsersList extends React.Component {

  createList(users) {
    return users.map((aUser) => {
      const { id, user, } = aUser;

      return (<li key={id}>{user} & {id}</li>);
    });
  }

  render() {
    const list = this.createList(this.props.userList);

    return (<ul>{list}</ul>);
  }
}

const mapStateToProps = (state) => {
  const { currentUser, } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    protectedData: state.protectedData.data,
    userList: state.applicationReducer.listOfUsers,
  };
};

export default connect(mapStateToProps)(UsersList);
