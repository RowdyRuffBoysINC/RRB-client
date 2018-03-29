import React from 'react';
import { UnControlled as CodeMirror, } from 'react-codemirror2';
import { connect, } from 'react-redux';
import { socket, } from '../Room';
import { SketchField, Tools, } from 'react-sketch';

import './WhiteBoardEditor.css';

export class WhiteBoardEditor extends React.Component {
  constructor() {
    super();
    this.state = { sketchFieldValue: {},};

    socket.on("whiteBoard msg sent back to clients", msg => {
      this.updateSketchFieldWithSocketInfo(msg);
    });
  }

    componentDidMount() {
    // no given functions to listen keyEvents from canvas
    // document.querySelector('.rdw-editor-toolbar').addEventListener('click', () => { 
      
    //   // Click events happen a couple milliseconds too early for fontsize/color/etc changes to register
    //   setTimeout(() => {

    //     socket.emit("word msg", {
    //       room: this.props.roomName,
    //       user: this.props.userName,
    //       msg: convertToRaw(this.state.editorState.getCurrentContent())
    //     });

    //     }, 100)
    //  });

    // document.querySelector('.wordEditor').addEventListener('keydown', () => { 

    //   socket.emit("word msg", {
    //     room: this.props.roomName,
    //     user: this.props.userName,
    //     msg: convertToRaw(this.state.editorState.getCurrentContent())
    //   });

    //  });

    // document.querySelector('.wordEditor').addEventListener('keyup', () => { 

    //   socket.emit("word msg", {
    //     room: this.props.roomName,
    //     user: this.props.userName,
    //     msg: convertToRaw(this.state.editorState.getCurrentContent())
    //   });

    // });
  }

  onSketchFieldChange = (data,__,___,____,_____) => {
    console.log('​------------------------------------------------------------------------------------');
    console.log('​WhiteBoardEditor -> onSketchFieldChange -> _,__,___,____,_____', data,__,___,____,_____);
    console.log('​------------------------------------------------------------------------------------');

    this.setState({sketchFieldValue: data, });
  }

  updateSketchFieldWithSocketInfo = (msg) => {
    console.log('​----------------------------------------------------------------');
    console.log('​WhiteBoardEditor -> updateSketchFieldWithSocketInfo -> msg', msg);
    console.log('​----------------------------------------------------------------');
    // this.setState({ editorState: EditorState.createWithContent(convertFromRaw(msg)),});
  }

  render() {
    console.log('​---------------------------------------------------------------------------------------');
    console.log('​WhiteBoardEditor -> render -> this.state.sketchFieldValue', this.state.sketchFieldValue);
    console.log('​---------------------------------------------------------------------------------------');
    return (
      <section className="whiteBoardContainer">
        <SketchField width="100vw"
          height="500px"
          tool={Tools.Pencil}
          lineColor="black"
          lineWidth={6}
          value={this.sketchFieldValue}
          forceValue={true}
          onChange={this.onSketchFieldChange}/>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { currentUser, } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    protectedData: state.protectedData.data,
    roomName: state.applicationReducer.roomName,
  };
};

export default connect(mapStateToProps)(WhiteBoardEditor);

