import React from 'react';
import { connect, } from 'react-redux';
import SIOC_Class from './SIOC';


export function UserList(props) {
  const SIOC = new SIOC_Class();

  const { userList, } = props;
  
  const list = userList
    .filter(user =>
      user.user !== props.username
    )
    .map(user =>
      <li onClick={() => props.createVideoFunc(user.id)} key={user.id}> Share your screen with {user.user} </li>
    );
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
