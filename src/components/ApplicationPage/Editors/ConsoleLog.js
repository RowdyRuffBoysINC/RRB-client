import React from 'react';
import { connect, } from 'react-redux';
import './ConsoleLog.css';

export function ConsoleLog(props) {
  const { logMessages, } = props;
  let counter = 0;

  const consoleLog = logMessages.map((message) => {
    const item = (<li className="console-log-item" key={counter}> &#62; {message} </li>);
    counter = counter + 1;
    return item;
  });

  return (<section className="console-log"><ul>{consoleLog}</ul></section>);
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.currentUser.username,
    name: `${state.auth.currentUser.firstName} ${state.auth.currentUser.lastName}`,
    logMessages: state.editorReducer.consoleLogMessages,
  };
};

export default connect(mapStateToProps)(ConsoleLog);
