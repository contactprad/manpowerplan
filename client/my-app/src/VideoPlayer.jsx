import React, {
  Component
} from "C:/Users/kumarp/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react";
import socketIOClient from "socket.io-client";
import PropTypes from 'C:/Users/kumarp/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/prop-types';
import { Player } from 'video-react';
import "video-react/dist/video-react.css";
const uuidv1 = require('C:/Users/kumarp/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/uuid/v1');

class VideoPlayer extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      source: "http://localhost:8081/",
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.load = this.load.bind(this);
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
    this.seek = this.seek.bind(this);
    this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.setMuted = this.setMuted.bind(this);
  }

  componentDidMount() {
    // subscribe state change
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
    this.setState({ source: "http://localhost:8081/video/" + uuidv1() })
    const socket = socketIOClient("http://127.0.0.1:8081");
    socket.on("videoalert", data => {
      console.log("alert")
      this.load();
    });
  }

  handleStateChange(state, prevState) {
    // copy player state to this component's state
    this.setState({
      player: state
    });
  }

  play() {
    this.refs.player.play();
  }

  pause() {
    this.refs.player.pause();
  }

  load() {
    this.refs.player.load();
  }

  changeCurrentTime(seconds) {
    return () => {
      const { player } = this.refs.player.getState();
      const currentTime = player.currentTime;
      this.refs.player.seek(currentTime + seconds);
    };
  }

  seek(seconds) {
    return () => {
      this.refs.player.seek(seconds);
    };
  }

  changePlaybackRateRate(steps) {
    return () => {
      const { player } = this.refs.player.getState();
      const playbackRate = player.playbackRate;
      this.refs.player.playbackRate = playbackRate + steps;
    };
  }

  changeVolume(steps) {
    return () => {
      const { player } = this.refs.player.getState();
      const volume = player.volume;
      this.refs.player.volume = volume + steps;
    };
  }

  setMuted(muted) {
    return () => {
      this.refs.player.muted = muted;
    };
  }

 render() {
  return (
    <Player
    ref="player"
      playsInline
      src={this.state.source}
    />
  );
}
}



export default VideoPlayer;
