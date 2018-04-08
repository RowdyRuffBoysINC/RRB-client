import React from 'react';
import { connect, } from 'react-redux';

import {
  updateChatLog,
  updateMessageDraft,
  isChatViewEnabled,
} from './../../actions/Chat';
import { socket, } from './Room';
import UserList from './UserList';

import './Chat.css';


export class Chat extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(updateChatLog(this.props.messageDraft));
    this.input.value = '';
  }

  handleMessageDraftChange() {
    this.props.dispatch(updateMessageDraft(this.input.value));
    this.input = this.props.messageDraft;
  }
  // Consider adding timestamp to messages
  generateChatList() {
    return this.props.chatLogs
      .map((message, key) =>
        <li
          key={key}
          className="message-content"
        >
          <span className="message-sender">
            {this.props.username}:
          </span>
          <p className="message-body">
            {message}
          </p>
        </li>
      );
  }

  render() {
    return (
      <section className="chat-wrapper">
        <header>
          <ul>
            <li>
              Chat
            </li>
            <li>
              Users ({this.props.numOfUsers})
              <UserList />
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
            onChange={() => {
              this.handleMessageDraftChange();
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
    messageDraft: state.chat.messageDraft,
    isChatViewEnabled: state.chat.isChatViewEnabled,
    username: state.auth.currentUser.username,
    numOfUsers: state.applicationReducer.listOfUsers.length,
  };
};

export default connect(mapStateToProps)(Chat);
