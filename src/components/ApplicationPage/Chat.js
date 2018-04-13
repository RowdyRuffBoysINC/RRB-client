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
    event
      .preventDefault();
    if (this.input.value !== '') {
      socket
        .emit('chat msg', {
          room: this.props.roomName,
          msg: this.props.messageDraft,
        });
      this.input.value = '';
    }
  }

  handleMessageDraftChange() {
    this.props.dispatch(updateMessageDraft({
      username: this.props.username,
      message: this.input.value,
    }));
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
            {message.username}:
          </span>
          <p className="message-body">
            {message.msg}
          </p>
        </li>
      );
  }

  generateChatView() {
    let chatDisplay;
    if (this.props.roomView === 'video') {
      chatDisplay = 'chat-display-video';
    }
    else {
      chatDisplay = 'chat-display-audio';
    }

    return (
      <section className="chat-room-view">
        <div className={chatDisplay}>
          <ul className="chat-messages">
            {this.generateChatList()}
          </ul>
        </div>
        <form
          onSubmit={(event) => {
            this.handleSubmit(event);
          }}>
          <input
            placeholder="Type here..."
            className="chat-user-input"
            ref={(input) => {
              this.input = input;
            }}
            value={this.props.messageDraft.msg}
            onChange={() => {
              this.handleMessageDraftChange();
            }}
          />
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
    let sectionClass;
    if (this.props.roomView === 'video') {
      sectionClass = 'chat-wrapper-video';
    }

    else {
      sectionClass = 'chat-wrapper-audio';
    }

    return (
      <section className={sectionClass}>
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
    roomView: state.applicationReducer.roomView,
    isChatViewEnabled: state.chat.isChatViewEnabled,
    username: state.auth.currentUser.username,
    numOfUsers: state.applicationReducer.listOfUsers.length,
    roomName: state.applicationReducer.roomName,
    chatUsername: state.chat.messageDraft.username,
  };
};

export default connect(mapStateToProps)(Chat);
