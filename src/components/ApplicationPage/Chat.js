import React from 'react';
import { connect, } from 'react-redux';

import { socket, } from './Room';
import { updateChatLog, } from './../../actions/Chat';
import './Chat.css';


export class Chat extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    const answer = this.input.value;
    console.log(answer);
    this.props.dispatch(updateChatLog());
  }

  render() {
    return (
      <section className="chat-wrapper">
        <div className="chat-display">
          <ul className="chat-messages">
            <li>
              Username: message from user
            </li>
          </ul>
        </div>
        <form
          onSubmit={(event) => {
            this.handleSubmit(event);
          }}>
          <input
            className="chat-user-input"
            placeholder="Type here..."
            ref={(input) => {
              this.input = input;
            }}
          />
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.currentUser.username,
    name: `${state.auth.currentUser.firstName} ${state.auth.currentUser.lastName}`,
  };
};

export default connect(mapStateToProps)(Chat);
