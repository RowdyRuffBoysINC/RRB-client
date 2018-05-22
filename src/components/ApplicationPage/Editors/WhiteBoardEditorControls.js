import React from 'react';
import { connect, } from 'react-redux';

import { setWhiteBoardEditorColor, setWhiteBoardEditorBrushSize, } from '../../../actions/Editor';
import './WhiteBoardEditorControls.css';

export function WhiteBoardEditorControls(props) {
  function changeColor(color) {
    props.dispatch(setWhiteBoardEditorColor(color));
  }

  function setBrushSize(brushSize) {
    props.dispatch(setWhiteBoardEditorBrushSize(brushSize));
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

  const { clear, } = props;

  return (
    <section className="whiteBoardControls-container">
      {colorChangeButtons}
      <div className="tool brush-size">
        <select className="size-picker" onChange={e => setBrushSize(e.currentTarget.value)}>
          <option>
            6
          </option>
          <option>
            7
          </option>
          <option>
            8
          </option>
          <option>
            10
          </option>
          <option>
            12
          </option>
          <option selected>
            16
          </option>
          <option>
            20
          </option>
          <option>
            24
          </option>
          <option>
            36
          </option>
          <option>
            48
          </option>
          <option>
            60
          </option>
          <option>
            72
          </option>
          <option>
            84
          </option>
          <option>
            96
          </option>
          <option>
            110
          </option>
        </select>
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
