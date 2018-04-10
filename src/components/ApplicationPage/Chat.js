import React from 'react';
import { connect, } from 'react-redux';

import {
  updateChatLog,
  updateMessageDraft,
  showChatView,
  showUserView,
} from './../../actions/Chat';
import { socket, } from './Room';
import UserList from './UserList';

import './Chat.css';

export class Chat extends React.Component {
  constructor(props) {
    super(props);
    socket.on('chat msg sent back to clients', (data) => {
      this.props.dispatch(updateChatLog(data));
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    socket.emit('chat msg', { room: this.props.roomName, msg: this.props.messageDraft, });
    this.input.value = '';
  }

  handleMessageDraftChange() {
    this.props.dispatch(updateMessageDraft({ username: this.props.username, message: this.input.value, }));
    this.input = this.props.messageDraft;
  }
  // Consider adding timestamp to messages
  generateChatList() {
    return this.props.chatLogs
      .map((message, key) =>
        <li key={key} className="message-content" >
          <span className="message-sender">
            {message.username}:
          </span>
          <p className="message-body">
            {message.msg}
          </p>
        </li>
      );
  }

  generateChatView() {
    return (
      <section className="chat-room-view">
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
            value={this.props.messageDraft.msg}
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

  generateUserListView() {
    return <UserList />;
  }

  render() {
    let view;
    this.props.isChatViewEnabled
      ? view = this.generateChatView()
      : view = this.generateUserListView();
    return (
      <section className="chat-wrapper">
        <header>
          <ul className="chat-tabs">
            <li onClick={() => this.props.dispatch(showChatView())}>
              Chat
            </li>
            <li onClick={() => this.props.dispatch(showUserView())}>
              Users ({this.props.numOfUsers})
            </li>
          </ul>
        </header>
        {view}
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
    roomName: state.applicationReducer.roomName,
    chatUsername: state.chat.messageDraft.username,
  };
};

export default connect(mapStateToProps)(Chat);
