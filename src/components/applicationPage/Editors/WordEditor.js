import React, { Component } from "react";
// import ReactDOM from 'react-dom';

// Require Editor JS files.
import "froala-editor/js/froala_editor.pkgd.min.js";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/themes/dark.min.css";

// Require Font Awesome.
import "font-awesome/css/font-awesome.css";

// Css for wordEditor
import "./WordEditor.css";

import FroalaEditor from "react-froala-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

import $ from "jquery";
window.$ = $;

class WordEditor extends Component {

  constructor() {
    super();

    this.state = {
      content: 'Insert text here =]'
    };

    this.config = {
      iframe: false,
      fullPage: true,
      htmlAllowedTags: [".*"],
      htmlAllowedAttrs: [".*"],
      htmlAllowedStyleProps: [".*"],
      htmlRemoveTags: ["script", "head"],
      pasteAllowedStyleProps: [".*"],
      pasteDeniedAttrs: [],
      lineBreakerOffset: 0,
      lineBreakerTags: [""],
      htmlAllowComments: true,
      events: {
        "froalaEditor.initialized": function (e, editor, html) {
          console.log("START!");
          console.log(html);
        },
        "froalaEditor.commands.after": function (e, editor, html) {
          console.log("COMMANDS AFTER!");
          console.log(html);
        },
        "froalaEditor.keydown": function (e, editor, html) {
          console.log("key down");
        },
        "froalaEditor.keyup": function (e, editor, html) {
          console.log("key up");
        }
      }
    };
  }

  componentWillMount() { }

  handleModelChange = model => {
    console.log("X.X modelChange", model);
    this.setState({ content: model });
  };

  render() {
    return (
      <div className="main">
        <div className="editorBox">
          <FroalaEditor
            tag="textarea"
            config={this.config}
            model={this.state.content}
            onModelChange={model => this.handleModelChange(model)}
          />
        </div>
      </div>
    );
  }
}

export default WordEditor;
