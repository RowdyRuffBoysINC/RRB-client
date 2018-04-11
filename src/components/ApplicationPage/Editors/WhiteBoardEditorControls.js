import React from 'react';
import { connect, } from 'react-redux';

import { setWhiteBoardEditorColor, setWhiteBoardEditorBrushSize, } from '../../../actions/Editor';
import './WhiteBoardEditorControls.css';

export function WhiteBoardEditorControls(props) {
  function changeColor(color) {
    props.dispatch(setWhiteBoardEditorColor(color));
  }


  function changeFontSizeSmall() {

  }

  function changeFontSizeBig() {

  }

  function changeFontSize() {
    if (props.whiteBoardEditorBrushSize === 12) {
      props.dispatch(setWhiteBoardEditorBrushSize(2));
    }

    else {
      props.dispatch(setWhiteBoardEditorBrushSize(props.whiteBoardEditorBrushSize + 2));
    }
  }

  function changeBrushToEraser() {
    props.dispatch(setWhiteBoardEditorColor('white'));
  }

  const arrOfColors = [ 'green', 'yellow', 'red', 'blue', 'black', ];
  const colorChangeButtons = arrOfColors.map(color => (<div className={`tool ${color}-brush`} key={color} onClick={() => changeColor(color)}></div>));
  const { whiteBoardEditorBrushSize, clear, } = props;

  return (
    <section className="whiteBoardControls-container">
      {colorChangeButtons}
      <div>
        <span onClick={() => changeFontSizeSmall()} className="tool change-size-button"> left </span>
        {whiteBoardEditorBrushSize}
        <span onClick={() => changeFontSizeBig()} className="tool change-size-button">right</span>
      </div>
      <div onClick={() => changeBrushToEraser()} className="tool eraser">Eraser</div>
      <div onClick={() => clear()} className="tool nuke">Clear</div>
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
