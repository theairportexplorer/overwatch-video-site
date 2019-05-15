class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this)
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>    
        <div data-vjs-player>
          <video ref={ node => this.videoNode = node } className="video-js"></video>
        </div>
      </div>
    )
  }
}

class VideoLinks extends React.Component {
  handleClick (videoFile, videoType) {
    ReactDOM.unmountComponentAtNode(document.getElementById("selected-video"));
    var videoJsOptions = {autoplay: true, controls: true, width: 1024, height: 576, sources: [{src: videoFile, type: videoType}]};
    ReactDOM.render(
      <VideoPlayer {...videoJsOptions}></VideoPlayer>,
      document.getElementById("selected-video")
    );
  }

  render () {
    return (
      <ul class="unformatted">
        <li><a href="#20180523_widowmaker" onClick={() => this.handleClick("video/20180523_widowmaker_18-05-23_22-39-27.mp4", "video/mp4")}>Widowmaker</a></li>
        <li><a href="#20190424_zenyatta" onClick={() => this.handleClick("video/20190424_zen_19-04-24_21-53-07.mp4", "video/mp4")}>Zenyatta</a></li>
        <li><a href="#20190415_reinhardt" onClick={() => this.handleClick("video/20190415_reinhardt_19-04-15_23-22-44.mp4", "video/mp4")}>Reinhardt</a></li>
        <li><a href="#20190427_sombra" onClick={() => this.handleClick("video/20190427_sombra_19-04-27_01-40-47.mp4", "video/mp4")}>Sombra</a></li>
        <li><a href="#20190313_dva" onClick={() => this.handleClick("video/20190313_dva_19-03-13_00-08-02.mp4", "video/mp4")}>D.Va</a></li>
      </ul>
    );
  }
}

ReactDOM.render(
  <VideoLinks></VideoLinks>,
  document.getElementById("video-list")
);