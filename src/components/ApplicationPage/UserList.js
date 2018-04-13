import React from 'react';
import { connect, } from 'react-redux';

export function UserList(props) {
  const { userList, } = props;

  const list = userList
    .map((user) => {
      if (user.user === props.username || props.roomView === 'audio') {
        return <li
          className="user"
          key={user.id}>
          {user.user}
        </li>;
      }
      else {
        return <li
          onClick={() => props.createVideoFunc(user.id)}
          key={user.id}>
          Share your camera with
          {user.user}
        </li>;
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
    roomView: state.applicationReducer.roomView,
  };
};

export default connect(mapStateToProps)(UserList);
