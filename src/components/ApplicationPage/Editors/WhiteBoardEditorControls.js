import React from 'react';
import { connect, } from 'react-redux';
import { setWhiteBoardEditorColor, setWhiteBoardEditorBrushSize, } from '../../../actions/Editor';
import './WhiteBoardEditorControls.css';

export function WhiteBoardEditorControls(props) {
  function changeColor(color) {
    props.dispatch(setWhiteBoardEditorColor(color));
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

  const { whiteBoardEditorBrushSize, } = props;

  return (
    <section className="whiteBoardControls-container">
      <div onClick={() => changeBrushToEraser()} className="tool eraser"></div>
      <div onClick={() => changeColor('green')} className="tool green-brush"></div>
      <div onClick={() => changeColor('red')} className="tool red-brush"></div>
      <div onClick={() => changeColor('blue')} className="tool blue-brush"></div>
      <div onClick={() => changeColor('yellow')} className="tool yellow-brush"></div>
      <div onClick={() => changeColor('black')} className="tool black-brush"></div>
      <div onClick={() => changeFontSize()} className="tool change-size-button"> {whiteBoardEditorBrushSize} </div>
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
