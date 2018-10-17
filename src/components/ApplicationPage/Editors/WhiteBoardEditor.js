import React from 'react';
import { connect } from 'react-redux';
import { SketchField, Tools } from 'react-sketch';

import WhiteBoardEditorControls from './WhiteBoardEditorControls';
import { setWhiteBoardEditorValue } from '../../../actions/Editor';
import { socket } from '../Room';
import './WhiteBoardEditor.css';

export class WhiteBoardEditor extends React.Component {
  constructor() {
    super();
    this.sketch = null;
    socket.on('whiteBoard msg sent back to clients', (msg) => {
      this.updateSketchFieldWithSocketInfo(msg);
    });
  }

  componentDidMount() {
    // No given functions to listen keyEvents from canvas
    document
      .querySelector('.upper-canvas')
      .addEventListener('click', () => {
        if (this.sketch) {
          this.sendMessage(
            'whiteBoard msg',
            this.sketch.toJSON(
              this.props.whiteBoardEditorValue
            )
          );
        }
      });

    document
      .querySelector('.upper-canvas')
      .addEventListener('mousedown', () => {
        if (this.sketch) {
          this.sendMessage(
            'whiteBoard msg',
            this.sketch.toJSON(
              this.props.whiteBoardEditorValue
            )
          );
        }
      });

    document
      .querySelector('.upper-canvas')
      .addEventListener('mouseup', () => {
        if (this.sketch) {
          this.sendMessage(
            'whiteBoard msg',
            this.sketch.toJSON(
              this.props.whiteBoardEditorValue
            )
          );
        }
      });

    document
      .querySelector('.upper-canvas')
      .addEventListener('mouseleave', () => {
        if (this.sketch) {
          this.sendMessage(
            'whiteBoard msg',
            this.sketch.toJSON(
              this.props.whiteBoardEditorValue
            )
          );
        }
      });
  }

  onSketchFieldChange(data) {
    this.props.dispatch(setWhiteBoardEditorValue(data));
  }

  clearSketchCanvas() {
    if (this.sketch)
      this.sketch.clear();
  }

  updateSketchFieldWithSocketInfo(msg) {
    if (this.sketch) {
      const convertedMsg = this.sketch.fromJSON(msg);
      this.props.dispatch(setWhiteBoardEditorValue(convertedMsg));
    }
  }

  sendMessage(message, msg) {
    socket
      .emit(
        message, {
          room: this.props.roomName,
          user: this.props.userName,
          msg,
        }
      );
  }

  render() {
    return (
      <section className="whiteboard-container">
        <WhiteBoardEditorControls clear={() => this.clearSketchCanvas()} />
        <SketchField
          width="100%"
          height="100%"
          tool={Tools.Pencil}
          lineColor={this.props.whiteBoardEditorColor}
          lineWidth={this.props.whiteBoardEditorBrushSize}
          ref={instance => this.sketch = instance}
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
    whiteBoardEditorValue: state.editorReducer.whiteBoardEditorValue,
    whiteBoardEditorBrushSize: state.editorReducer.whiteBoardEditorBrushSize,
    whiteBoardEditorColor: state.editorReducer.whiteBoardEditorColor,
  };
};

export default connect(mapStateToProps)(WhiteBoardEditor);
