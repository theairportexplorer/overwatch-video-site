const OverwatchHeroes = [
  "Ana", "Ashe",
  "Baptiste", "Bastion", "Brigitte",
  "D.Va", "Doomfist",
  "Genji",
  "Hanzo",
  "Junkrat",
  "Lucio",
  "McCree", "Mei", "Mercy", "Moira",
  "Orisa",
  "Pharah",
  "Reaper", "Reinhardt", "Roadhog",
  "Soldier76", "Sombra", "Symmetra",
  "Torbjorn", "Tracer",
  "Widowmaker", "Winston", "Wrecking Ball",
  "Zarya", "Zenyatta"
];

function normalizeString (inputString) {
  return inputString.toLowerCase()
    .replace('.', '')
    .replace(' ' , '');
}

class VideoTitle extends React.Component {
  render () {
    return <h1 class="video-title">{this.props.videoTitle.replace("_", " ")}</h1>
  }
}

class YouTubeIFrame extends React.Component {
  render () {
    return (
      // original dimensions 560x315
      <iframe width="700" height="394" src={this.props.url+"?start=3"} frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    )
  }
}

class VideoTag extends React.Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event) {
    event.preventDefault()
    // console.log("calling VideoTag.handleClick");
    $.ajax({
      url: "http://localhost:5000/retrieve/tag",
      method: "get",
      dataType: "json",
      data: {label: this.props.tag},
      success: function (result) {
        var r = {}
        result["result"].forEach((element) => r[element.video_title] = element);
        ReactDOM.unmountComponentAtNode(document.getElementById("video-search-result"));
        ReactDOM.render(
          <VideoLinks videoSearchResults={r} />,
          document.getElementById("video-search-result")
        );
      },
      error: function (resp) {
        console.log(resp);
        alert(resp.responseText);
      }
    });
  }

  render () {
    return <a class="tag" href={"#" + this.props.tag} onClick={e => this.handleClick(e)}>{this.props.tag}</a>;
  }
}

class VideoTags extends React.Component {
  render () {
    console.log(this.props.videoTags);
    return (
      <p class="video-description">Tags:
        { this.props.videoTags.map(tag => <VideoTag tag={tag} />) }
      </p>
    );
  }
}

class VideoDescription extends React.Component {
  render () {
    return <p class="video-description">Commentary: {this.props.videoDescription}</p>
  }
}

class VideoLink extends React.Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event) {
    event.preventDefault();
    ReactDOM.unmountComponentAtNode(document.getElementById("selected-video-title"));
    ReactDOM.render(
      <VideoTitle videoTitle={this.props.metadata.video_title} />,
      document.getElementById("selected-video-title")
    );
    ReactDOM.unmountComponentAtNode(document.getElementById("selected-video-iframe"));
    ReactDOM.render(
      <YouTubeIFrame url={this.props.metadata.video_url} />,
      document.getElementById("selected-video-iframe")
    );
    ReactDOM.unmountComponentAtNode(document.getElementById("selected-video-tags"));
    ReactDOM.render(
      <VideoTags videoTags={this.props.metadata.tags} />,
      document.getElementById("selected-video-tags")
    );
    ReactDOM.unmountComponentAtNode(document.getElementById("selected-video-description"));
    ReactDOM.render(
      <VideoDescription videoDescription={this.props.metadata.description} />,
      document.getElementById("selected-video-description")
    );
  };

  render () {
    return (
      <li><a href={"#"+this.props.metadata.video_title} onClick={e => this.handleClick(e)}>{this.props.metadata.video_title}</a></li>
    )
  }
}

class VideoLinks extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3 class="search-results">Search Results</h3>
        <ul class="unformatted">
          { Object.keys(this.props.videoSearchResults).map(key => <VideoLink metadata={this.props.videoSearchResults[key]}/>) }
        </ul>
      </div>
    );
  }
}

class VideoSearch extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      videoStartDate: null,
      videoEndDate: null,
      hero: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
    $('[id^="datepicker"]').datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat: 'yy-mm-dd'
    });
  }

  handleSubmit (event) {
    event.preventDefault();
    $.ajax({
      url: "http://localhost:5000/retrieve",
      method: "get",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: {
        start_date: $("#datepicker1").val(),
        end_date: $("#datepicker2").val(),
        hero: this.state.hero
      },
      success: function (result) {
        var r = {}
        result["result"].forEach((element) => r[element.video_title] = element);
        ReactDOM.unmountComponentAtNode(document.getElementById("video-search-result"));
        ReactDOM.render(
          <VideoLinks videoSearchResults={r} />,
          document.getElementById("video-search-result")
        );
      },
      error: function (result) {
        console.log(result);
        alert(result.responseText);
      }
    });
  }

  handleChange (event) {
    this.state[event.target.name] = event.target.value;
  }

  render () {
    return (
      <div>
        <h4>Video Search</h4>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label class="form">Start Date:</label><input id="datepicker1" name="videoStartDate" type="text" onChange={this.handleChange} /><br />
          <label class="form">End Date:</label><input id="datepicker2" name="videoEndDate" type="text" onChange={this.handleChange} /><br />
          <label class="form">Hero Name:</label>
          <select name="hero" value={this.state.hero} onChange={this.handleChange}>
            <option value=""></option>
            { OverwatchHeroes.map(hero => <option value={normalizeString(hero)}>{hero}</option>) }
          </select><br />
          <input class="form-submit btn btn-success" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

ReactDOM.render(
  <VideoSearch></VideoSearch>,
  document.getElementById("video-search-menu")
);