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

const ClipTypes = ["Highlight", "PotG"]

function normalizeString (inputString) {
  return inputString.toLowerCase()
    .replace('.', '')
    .replace(' ', '');
}

class VideoInfoUpdate extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      videoUrl: props.metadata.video_url,
      videoDate: props.metadata.video_date,
      videoTitle: props.metadata.video_title,
      hero: props.metadata.hero,
      type: props.metadata.type,
      description: props.metadata.description,
      tags: props.metadata.tags,
      ytiFrame: props.metadata.youtube_iframe,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
    $("#datepicker-update").datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat: 'yy-mm-dd'
    })
  }

  handleChange (event) {
    this.state[event.target.name] = event.target.value;
  }

  handleSubmit (event) {
    event.preventDefault();
    console.log(this.state);
    // $.ajax({
    //   url: "http://localhost:5000/update-db",
    //   method: 'post',
    //   contenttType: "application/json; charset=utf-8",
    //   dataType: 'text',
    //   data: JSON.stringify({}),
    //   success: function () {
    //     // Clear everything
    //   },
    //   error: function (result) {
    //     console.log(result);
    //     alert(result.responseText);
    //   }
    // });
  }

  render () {
    return (
      <div>
        <h4 id="video-url-update-area">Video URL: <a href={this.state.videoUrl} target="_blank">{this.state.videoUrl}</a></h4>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div class="input-group mb-3 col-md-8">
            <div class="input-group-prepend">
              <label class="input-group-text">Video Title</label>
            </div>
            <input class="form-control" id="update-video-title" name="videoTitle" type="text" onChange={this.handleChange} />
          </div>
          <div class="input-group mb-3 col-md-8">
            <div class="input-group-prepend">
              <label class="input-group-text">iFrame HTML</label>
            </div>
            <textarea name="ytiFrame" class="form-control" rows="5" id="iFrameHTML" onChange={this.handleChange} />
          </div>
          <div class="input-group mb-3 col-md-8">
            <div class="input-group-prepend">
              <label class="input-group-text">Video Date</label>
            </div>
            <input class="form-control" id="datepicker-update" name="videoDate" type="text" onChange={this.handleChange} />
          </div>
          <div class="input-group mb-3 col-md-8">
            <div class="input-group-prepend">
              <label class="input-group-text">Hero Name</label>
            </div>
            <select class="custom-select" id="overwatch-hero-list" name="hero" value={this.state.hero} onChange={this.handleChange}>
              <option selected>Select Hero...</option>
              { OverwatchHeroes.map(hero => <option value={normalizeString(hero)}>{hero}</option>) }
            </select>
          </div>
          <div class="input-group mb-3 col-md-8">
            <div class="input-group-prepend">
              <label class="input-group-text">Clip Type</label>
            </div>
            <select class="custom-select" name="type" value={this.state.type} onChange={this.handleChange}>
              <option selected>Select Clip Type...</option>
              { ClipTypes.map(clipType => <option value={normalizeString(clipType)}>{clipType}</option>) }
            </select>
          </div>
          <div class="input-group mb-3 col-md-8">
            <div class="input-group-prepend">
              <label class="input-group-text">Tags</label>
            </div>
            <textarea class="form-control" name="tags" rows="1" id="update-tags" onChange={this.handleChange} />
          </div>
          <div class="input-group mb-3 col-md-8">
            <div class="input-group-prepend">
              <label class="input-group-text">Description</label>
            </div>
            <textarea name="description" class="form-control" rows="4" id="update-description" onChange={this.handleChange} />
          </div>
          <input id="submit-update" class="form-submit btn btn-success" type="submit" value="Update" />
        </form>
      </div>
    );
  }
}

class VideoLink extends React.Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event) {
    event.preventDefault();
    ReactDOM.unmountComponentAtNode(document.getElementById("video-update-form"));
    ReactDOM.render(
      <VideoInfoUpdate metadata={this.props.metadata} />,
      document.getElementById("video-update-form")
    );
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