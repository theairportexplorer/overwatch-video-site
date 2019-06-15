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
    .replace(' ', '');
}

class VideoInfoUpdate extends React.Component {
  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {

  }

  handleSubmit (event) {
    event.preventDefault();
  }

  render () {
    return (
      <div>

      </div>
    );
  }
}

ReactDOM.render(
  <VideoInfoUpdate></VideoInfoUpdate>,
  document.getElementById("video-update-form")
);

class VideoLink extends React.Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event) {
    event.preventDefault();
  }

  render () {
    return (
      <li><a class="tag" href={"#"+this.props.metadata.video_title} onClick={e => this.handleClick(e)}>{this.props.metadata.video_title}</a></li>
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
        <h3 class="col-12">Video Search</h3>
        <form class="form-inline" onSubmit={e => this.handleSubmit(e)}>
          <div class="input-group col-sm-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Start Date:</span>
            </div>
            <input class="form-control" id="datepicker1" name="videoStartDate" type="text" onChange={this.handleChange} />
          </div>
          <div class="input-group col-sm-3">
            <div class="input-group-prepend">
              <span class="input-group-text">End Date:</span>
            </div>
            <input class="form-control" id="datepicker2" name="videoEndDate" type="text" onChange={this.handleChange} />
          </div>
          <div class="input-group col-sm-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Hero Name:</span>
            </div>
            <select class="custom-select" name="hero" value={this.state.hero} onChange={this.handleChange}>
              <option value=""></option>
              { OverwatchHeroes.map(hero => <option value={normalizeString(hero)}>{hero}</option>) }
            </select>
          </div>
          <input class="col-sm-3 form-submit btn btn-success" type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

ReactDOM.render(
  <VideoSearch></VideoSearch>,
  document.getElementById("video-search-menu")
);