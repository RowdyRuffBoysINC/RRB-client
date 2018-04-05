import React from 'react';
import { connect, } from 'react-redux';
import { setWhiteBoardEditorColor, setWhiteBoardEditorBrushSize, } from '../../../actions/Editor';
import './WhiteBoardEditorControls.css';

export class WhiteBoardEditorControls extends React.Component {

  changeColor(color) {
    console.log(color);
    this.props.dispatch(setWhiteBoardEditorColor(color));
  }

  changeFontSize() {
    if (this.props.whiteBoardEditorBrushSize === 12) {
      this.props.dispatch(setWhiteBoardEditorBrushSize(2));
    }

    else {
      this.props.dispatch(setWhiteBoardEditorBrushSize(this.props.whiteBoardEditorBrushSize + 2));
    }
  }

  changeBrushToEraser() {
    this.props.dispatch(setWhiteBoardEditorColor('white'));
  }

  render() {
    const { whiteBoardEditorBrushSize, } = this.props;
    
    return (
      <section className="whiteBoardControls-container">
        <div onClick={() => this.changeBrushToEraser()} className="tool eraser"></div>
        <div onClick={() => this.changeColor('green')} className="tool green-brush"></div>
        <div onClick={() => this.changeColor('red')} className="tool red-brush"></div>
        <div onClick={() => this.changeColor('blue')} className="tool blue-brush"></div>
        <div onClick={() => this.changeColor('yellow')} className="tool yellow-brush"></div>
        <div onClick={() => this.changeColor('black')} className="tool black-brush"></div>
        <div onClick={() => this.changeFontSize()} className="tool change-size-button"> {whiteBoardEditorBrushSize} </div>
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
