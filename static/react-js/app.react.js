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

class YouTubeUrl extends React.Component {
  youtubeUrl () {
    return this.props.url;
  }

  render () {
    // return <div dangerouslySetInnerHTML={this.iframe()}></div>;
    return (
      <iframe width="560" height="315" src={this.youtubeUrl()} frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    )
  }
}

class VideoLinks extends React.Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event) {
    event.preventDefault();
    ReactDOM.unmountComponentAtNode(document.getElementById("selected-video"));
    ReactDOM.render(
      <YouTubeUrl url={event.target.value} />,
      document.getElementById("selected-video")
    );
  }

  render() {
    return (
      <div>
        <h3 class="search-results">Search Results</h3>
        <ul class="unformatted">
          {/* {
            Object.keys(this.props.videoSearchResult).map(
              (key, index) => <li><a href="#" value={this.props.videoSearchResult[keys].video_url}>{key}</a></li> 
            )
          } */}
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
        console.log(result);
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
        <form onSubmit={this.handleSubmit}>
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