const widowmaker20180523 = '<iframe width="560" height="315" src="https://www.youtube.com/embed/Tk_S1nlAvyY" \
                          frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; \
                          picture-in-picture" allowfullscreen></iframe>';

class YouTubeIFrame extends React.Component {
  iframe () {
    return {__html: this.props.iframe};
  }
  render () {
    return <div dangerouslySetInnerHTML={this.iframe()}></div>;
  }
}

class VideoLinks extends React.Component {
  handleClick (iFrame) {
    ReactDOM.unmountComponentAtNode(document.getElementById("selected-video"));
    ReactDOM.render(
      <YouTubeIFrame iframe={iFrame} />,
      document.getElementById("selected-video")
    );
  }

  render() {
    return (
      <ul class="unformatted">
        <li><a href="#20180523_widowmaker" onClick={() => this.handleClick(widowmaker20180523)}>Widowmaker</a></li>
      </ul>
    );
  }
}

ReactDOM.render(
  <VideoLinks></VideoLinks>,
  document.getElementById("video-list")
);