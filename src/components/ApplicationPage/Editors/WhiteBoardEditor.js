import React from 'react';
import { connect, } from 'react-redux';
import { socket, } from '../Room';
import { SketchField, Tools, } from 'react-sketch';
import { setWhiteBoardEditorValue } from "../../../actions/Editor";
import './WhiteBoardEditor.css';

export class WhiteBoardEditor extends React.Component {
  constructor() {
    super();
    this.state = { sketchFieldValue: null, };
    this.sketch = null;
    this.interval = null;

    socket.on('whiteBoard msg sent back to clients', (msg) => {
      this.updateSketchFieldWithSocketInfo(msg);
    });
  }

  componentDidMount() {
    // No given functions to listen keyEvents from canvas
    document.querySelector('.upper-canvas').addEventListener('click', () => {
      // Click events happen a couple milliseconds too early for fontsize/color/etc changes to register
      if (this.sketch) {
        this.sendMessage("whiteBoard msg", this.sketch.toJSON(this.props.whiteBoardEditorValue));
      }
    });

    document.querySelector('.upper-canvas').addEventListener('mousedown', () => {

      if (this.sketch) {
        this.sendMessage("whiteBoard msg", this.sketch.toJSON(this.props.whiteBoardEditorValue));
      }
    });

    document.querySelector('.upper-canvas').addEventListener('mouseup', () => {

      if (this.sketch) {
        this.sendMessage("whiteBoard msg", this.sketch.toJSON(this.props.whiteBoardEditorValue));
      }

    });

    document.querySelector('.upper-canvas').addEventListener('mouseleave', () => {

      if (this.sketch) {
        this.sendMessage("whiteBoard msg", this.sketch.toJSON(this.props.whiteBoardEditorValue));
      }
    });
  }

  onSketchFieldChange = (data, __, ___, ____, _____) => {
    this.props.dispatch(setWhiteBoardEditorValue(data));
  }

  updateSketchFieldWithSocketInfo(msg) {
    if (this.sketch) {
      // Surprise, this.sketch.fromJSON rerenders SketchField by ITSELF; no need to bind
      const convertedMsg = this.sketch.fromJSON(msg);
      this.props.dispatch(setWhiteBoardEditorValue(convertedMsg));
    }
  }

  sendMessage(message, msg) {
    socket.emit(message, {
      room: this.props.roomName,
      user: this.props.userName,
      msg,
    });
  }

  render() {
    return (
      <section className="whiteboard-container">
        <SketchField width="100vw"
          height="500px"
          tool={Tools.Pencil}
          lineColor="black"
          lineWidth={6}
          ref={(instance) => this.sketch = instance}
          forceValue={true}
          onChange={data => this.onSketchFieldChange(data)} />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.currentUser.username,
    name: `${state.auth.currentUser.firstName} ${state.auth.currentUser.lastName}`,
    roomName: state.applicationReducer.roomName,
    whiteBoardEditorValue: state.editorReducer.whiteBoardEditorValue
  };
};

export default connect(mapStateToProps)(WhiteBoardEditor);
