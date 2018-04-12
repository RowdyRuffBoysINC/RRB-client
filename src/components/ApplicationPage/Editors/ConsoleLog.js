import React from 'react';
import { connect, } from 'react-redux';
import './ConsoleLog.css';

export function ConsoleLog(props) {
  const { userList, } = props;

  const consoleLog = userList.map((user) => {
    if (user.user === props.username) {
      return <li className="user" key={user.id}>{user.user}</li>;
    }
    else {
      return <li onClick={() => props.createVideoFunc(user.id)} key={user.id}>Share your camera with {user.user}</li>;
    }
  });
  return (<section className="console-log"><ul>{consoleLog}</ul></section>);
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.currentUser.username,
    name: `${state.auth.currentUser.firstName} ${state.auth.currentUser.lastName}`,
    userList: state.applicationReducer.listOfUsers,
    createVideoFunc: state.applicationReducer.createVideoFunc,
  };
};

export default connect(mapStateToProps)(ConsoleLog);
