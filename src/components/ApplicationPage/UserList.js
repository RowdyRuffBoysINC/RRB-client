import React from 'react';
import { connect, } from 'react-redux';

export function UserList(props) {
  const { userList, } = props;

  const list = userList
    .map((user) => {
      <li onClick={() => props.createVideoFunc(user.id)} key={user.id}>Share your camera with {user.user}</li>;
      if (user.user === props.username) {
        return <li key={user.id}>{user.user}</li>;
      }
    });
  return (<ul>{list}</ul>);
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.currentUser.username,
    name: `${state.auth.currentUser.firstName} ${state.auth.currentUser.lastName}`,
    userList: state.applicationReducer.listOfUsers,
    createVideoFunc: state.applicationReducer.createVideoFunc,
  };
};

export default connect(mapStateToProps)(UserList);
