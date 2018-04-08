import React from 'react';
import { connect, } from 'react-redux';

import { socket, } from './Room';
import { updateChatLog, } from './../../actions/Chat';
import './Chat.css';


export class Chat extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    const message = this.input.value;
    this.props.dispatch(updateChatLog(message));
    console.log(this.props);
  }

  render() {
    console.log(this.props);
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
  return { chatLogs: state.chat.chatLogs, };
};

export default connect(mapStateToProps)(Chat);
