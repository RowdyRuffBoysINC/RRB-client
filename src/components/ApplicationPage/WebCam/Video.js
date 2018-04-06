import './WebCam.css';
import PropTypes from 'prop-types';
import React from 'react';
import {trace,} from './helpers';

const propTypes = {
  muted: PropTypes.bool,
  autoPlay: PropTypes.bool,
  src: PropTypes.string,
  className: PropTypes.string,
};

export class Video extends React.Component {
  constructor(props) {
    super(props);
    this.src = null;
    this.video = null;
  }

  componentDidMount() {
    this.load();
  }
  load() {
    // Load video
  }

  setSource(src) {
    this.src = src;
  }

  render() {
    const {muted, videoId, src, autoPlay,} = this.props;
    trace('Rendering video component');
    return (
      <video
        className={this.props.className}
        id={videoId}
        ref = {c => this.video = c}
        muted={muted}
        autoPlay={autoPlay}
        src={src}
      >
      </video>

    );
  }
}

Video.propTypes = propTypes;

export default Video;

