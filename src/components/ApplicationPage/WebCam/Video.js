import './WebCam.css';
import PropTypes from 'prop-types';
import React from 'react';

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
    // This.video.load();
  }

  setSource(src) {
    this.src = src;
  }

  render() {
    const {muted, videoId, src, autoPlay,} = this.props;

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

