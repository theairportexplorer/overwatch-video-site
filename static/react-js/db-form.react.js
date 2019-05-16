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

const ClipTypes = ["Highlight", "PotG"];

function normalizeString (inputString) {
  return inputString.toLowerCase()
    .replace('.', '')
    .replace(' ', '');
}

class OverwatchForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      videoUrl: null,
      videoDate: null,
      videoTitle: null,
      hero: null,
      type: null,
      description: null,
      tags: null,
      ytiFrame: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    // console.log(event.target.name);
    // console.log(event.target.value);
    this.state[event.target.name] = event.target.value;
    // console.log(this.state);
  }

  handleSubmit (event) {
    console.log(this.state);
    event.preventDefault();
    $.ajax({
      url: "http://localhost:5000/populate-db",
      method: 'post',
      contentType: "application/json; charset=utf-8",
      dataType: 'text',
      data: JSON.stringify({
        video_url: this.state.videoUrl,
        video_date: this.state.videoDate,
        video_title: this.state.videoTitle,
        hero: this.state.hero,
        type: this.state.type,
        description: this.state.type,
        tags: this.state.tags,
        youtube_iframe: this.state.ytiFrame
      }),
      error: function (result) {
        console.log(result);
        //alert("something");
      }
    });
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <label>Hero Name:</label><input name="hero" type="text" onChange={this.handleChange} /><br /> */}
        <label class="form">Video URL:</label><br />
        <textarea name="videoUrl" rows="1" cols="50" onChange={this.handleChange} /><br />
        <label class="form">YouTube iFrame:</label><br />
        <textarea name="ytiFrame" rows="4" cols="50" onChange={this.handleChange} /><br />
        <label class="form">Video Date:</label><input name="videoDate" type="text" onChange={this.handleChange} /><br />
        <label class="form">Hero Name:</label>
        <select id="overwatch-hero-list" name="hero" value={this.state.hero} onChange={this.handleChange}>
          <option value=""></option>
          { OverwatchHeroes.map(hero => <option value={normalizeString(hero)}>{hero}</option>) }
        </select><br />
        <label class="form">Alternate Title:</label><input name="videoTitle" type="text" onChange={this.handleChange} /><br />
        <label class="form">Clip Type:</label>
        <select name="type" value={this.state.type} onChange={this.handleChange}>
          <option value=""></option>
          { ClipTypes.map(clipType => <option value={normalizeString(clipType)}>{clipType}</option>) }
        </select><br />
        <label class="form">Tags:</label><br />
        <textarea name="tags" rows="1" cols="50" onChange={this.handleChange} /><br />
        <label class="form">Description:</label><br />
        <textarea name="description" rows="4" cols="50" onChange={this.handleChange}></textarea><br />
        <input class="form-submit" type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <OverwatchForm></OverwatchForm>,
  document.getElementById('overwatchForm')
);