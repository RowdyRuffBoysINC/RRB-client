import React from 'react';
import { connect, } from 'react-redux';
// import io from 'socket.io-client';
import EditorView from './EditorView';
// const socket = io('http://localhost:8080');

export class Room extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <section>
        <EditorView />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Room);

