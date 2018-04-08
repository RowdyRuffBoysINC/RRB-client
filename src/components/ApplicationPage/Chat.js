import React from 'react';
import { connect, } from 'react-redux';

import {
  updateChatLog,
  isChatViewEnabled,
} from './../../actions/Chat';
import { socket, } from './Room';
import UserList from './UserList';

import './Chat.css';


export class Chat extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(updateChatLog(this.input.value));
    this.input.value = '';
  }
  // Consider adding timestamp to messages
  generateChatList() {
    return this.props.chatLogs
      .map((message, key) =>
        <li key={key}>{this.props.username}: {message}</li>
      );
  }

  render() {
    return (
      <section className="chat-wrapper">
        <header>
          <ul>
            <li>
              <a>
                Chat
              </a>
            </li>
            <li>
              <a>
                Users ({this.props.numOfUsers})
                <UserList />
              </a>
            </li>
          </ul>
        </header>
        <div className="chat-display">
          <ul className="chat-messages">
            {this.generateChatList()}
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
          <button>
            Send
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    chatLogs: state.chat.chatLogs,
    isChatViewEnabled: state.chat.isChatViewEnabled,
    username: state.auth.currentUser.username,
    numOfUsers: state.applicationReducer.listOfUsers.length,
  };
};

export default connect(mapStateToProps)(Chat);
