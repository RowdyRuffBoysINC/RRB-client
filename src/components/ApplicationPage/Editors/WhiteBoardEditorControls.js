import React from 'react';
import { connect, } from 'react-redux';
import { setWhiteBoardEditorColor, setWhiteBoardEditorBrushSize, } from '../../../actions/Editor';
import './WhiteBoardEditorControls.css';

export class WhiteBoardEditorControls extends React.Component {
  render() {
    return (
      <section className="whiteboardControls-container">
        <div className="tool eraser"></div>
        <div className="tool green-brush"></div>
        <div className="tool red-brush"></div>
        <div className="tool blue-brush"></div>
        <div className="tool yellow-brush"></div>
        <div className="tool green-brush" />
        <div className="tool change-size-button"> {this.props.setWhiteBoardEditorColor} </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    whiteBoardEditorBrushSize: state.editorReducer.whiteBoardEditorBrushSize,
    whiteBoardEditorColor: state.editorReducer.whiteBoardEditorColor,
  };
};

export default connect(mapStateToProps)(WhiteBoardEditorControls);
