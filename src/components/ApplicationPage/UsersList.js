import React from 'react';
import { connect, } from 'react-redux';

export function UsersList(props) {
  function createList(users) {
    return users.map((aUser) => {
      const { id, user, } = aUser;

      return (<li onClick={() => props.createOffer(id)} key={id}> Share your screen with {user} </li>);
    });
  }

  const list = createList(props.userList);

  return (<ul>{list}</ul>);

}

const mapStateToProps = (state) => {
  return {
    username: state.auth.currentUser.username,
    name: `${state.auth.currentUser.firstName} ${state.auth.currentUser.lastName}`,
    userList: state.applicationReducer.listOfUsers,
  };
};

export default connect(mapStateToProps)(UsersList);
