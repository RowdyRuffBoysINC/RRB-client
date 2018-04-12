import React from 'react';
import { connect, } from 'react-redux';

import { setWhiteBoardEditorColor, setWhiteBoardEditorBrushSize, } from '../../../actions/Editor';
import './WhiteBoardEditorControls.css';

export function WhiteBoardEditorControls(props) {
  function changeColor(color) {
    props.dispatch(setWhiteBoardEditorColor(color));
  }

  function _sizeRatio(x) {
    return Math.floor(x + (x / 8) + (x < 9 ? 3 : 6));
  }

  function decreaseBrushSize(brushSize) {
    const decreasedSize = Math.floor(brushSize + (brushSize / (brushSize / 8)) - (brushSize < 9 ? 3 : 6));
    console.log(decreasedSize, 'size');
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

  console.log(whiteBoardEditorBrushSize);
  return (
    <section className="whiteBoardControls-container">
      {colorChangeButtons}
      <div>
        <span
          onClick={() => decreaseBrushSize(whiteBoardEditorBrushSize)}
          className="tool change-size-button"
        >
          left
        </span>
        {whiteBoardEditorBrushSize}
        <span
          onClick={() => increaseBrushSize(whiteBoardEditorBrushSize)}
          className="tool change-size-button"
        >
          right
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
