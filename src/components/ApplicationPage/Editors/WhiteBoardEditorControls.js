import React from 'react';
import { connect, } from 'react-redux';

import { setWhiteBoardEditorColor, setWhiteBoardEditorBrushSize, } from '../../../actions/Editor';
import './WhiteBoardEditorControls.css';

export function WhiteBoardEditorControls(props) {
  function changeColor(color) {
    props.dispatch(setWhiteBoardEditorColor(color));
  }

  function decreaseBrushSize(brushSize) {
    const decreasedSize = Math.ceil((8 * (brushSize - (brushSize < 9 ? 3 : 6)) / 9));
    props.dispatch(setWhiteBoardEditorBrushSize(decreasedSize));
  }

  function increaseBrushSize(brushSize) {
    const increasedSize = Math.floor(brushSize + (brushSize / 8) + (brushSize < 9 ? 3 : 6));
    props.dispatch(setWhiteBoardEditorBrushSize(increasedSize));
  }

  function changeBrushToEraser() {
    props.dispatch(setWhiteBoardEditorColor('white'));
  }

  const arrOfColors = [
    'green',
    'yellow',
    'red',
    'blue',
    'black',
  ];

  const colorChangeButtons = arrOfColors
    .map(color => (
      <div
        className={`tool ${color}-brush`}
        key={color}
        onClick={() => changeColor(color)}
      />
    ));

  const {
    whiteBoardEditorBrushSize,
    clear,
  } = props;

  return (
    <section className="whiteBoardControls-container">
      {colorChangeButtons}
      <div className="tool whiteboard">
        <span
          onClick={() => decreaseBrushSize(whiteBoardEditorBrushSize)}
          className="change-size-button"
        >
          Less
        </span>
        <span className="whiteboard-num">{whiteBoardEditorBrushSize}</span>
        <span
          onClick={() => increaseBrushSize(whiteBoardEditorBrushSize)}
          className="change-size-button"
        >
          More
        </span>
      </div>
      <div
        onClick={() => changeBrushToEraser()}
        className="tool eraser"
      >
        Eraser
      </div>
      <div
        onClick={() => clear()}
        className="tool nuke"
      >
        Clear
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    whiteBoardEditorBrushSize: state.editorReducer.whiteBoardEditorBrushSize,
    whiteBoardEditorColor: state.editorReducer.whiteBoardEditorColor,
  };
};

export default connect(mapStateToProps)(WhiteBoardEditorControls);
