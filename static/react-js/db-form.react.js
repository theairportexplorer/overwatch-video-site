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
        alert(result);
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
        <select name="hero" value={this.state.hero} onChange={this.handleChange}>
          <option value=""></option>
          <option value="dva">D.Va</option>
          <option value="reinhardt">Reinhardt</option>
          <option value="sombra">Sombra</option>
          <option value="widowmaker">Widowmaker</option>
          <option value="zenyatta">Zenyatta</option>
        </select><br />
        <label class="form">Alternate Title:</label><input name="videoTitle" type="text" onChange={this.handleChange} /><br />
        <label class="form">Clip Type:</label>
        <select name="type" value={this.state.type} onChange={this.handleChange}>
          <option value=""></option>
          <option value="highlight">Highlight</option>
          <option value="potg">PotG</option>
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