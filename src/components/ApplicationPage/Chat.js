import React from 'react';

import './Chat.css';


export default function Chat(props) {
  return (
    <section className="chat-wrapper">
      <div className="chat-display">
        <ul className="chat-messages">
          <li>
            Username: message from user
          </li>
        </ul>
      </div>
      <input className="chat-user-input" placeholder="Type here..." />
    </section>
  );
}
