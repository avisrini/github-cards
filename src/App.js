import React from "react";
import axios from "axios";
import "./App.css";

// const testData = [
//   {
//     id: 8098242,
//     avatar_url: "https://avatars.githubusercontent.com/u/8098242?v=4",
//     company: "Enphase Energy",
//     name: "Avinash Srinivasan",
//   },
//   {
//     id: 25254,
//     avatar_url: "https://avatars.githubusercontent.com/u/25254?v=4",
//     company: "Apex",
//     name: "TJ Holowaychuk",
//   },
//   {
//     id: 1060,
//     avatar_url: "https://avatars.githubusercontent.com/u/1060?v=4",
//     name: "Andrew Nesbitt",
//     company: "@ecosyste-ms and @octobox ",
//   },
// ];

class Card extends React.Component {
  render() {
    return (
      <div className="github-card">
        <img className="avatar" src={this.props.avatar_url} alt="avatar"></img>
        <div className="info">
          <div className="userName">{this.props.name}</div>
          <div className="company">{this.props.company}</div>
        </div>
      </div>
    );
  }
}

class CardBoard extends React.Component {
  render() {
    return (
      <div className="card-board">
        {this.props.profiles.map((profile) => (
          <Card key={profile.id} {...profile} />
        ))}
      </div>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ userName: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `https://api.github.com/users/${this.state.userName}`
    );
    this.props.addProfile(response.data);
    this.setState({ userName: "" });
  };

  render() {
    return (
      <form>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.userName}
        ></input>
        <button onClick={this.handleSubmit}>Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
    };
  }

  addProfile = (profile) => {
    const oldProfiles = this.state.profiles;
    this.setState({ profiles: [...oldProfiles, profile] });
  };

  render() {
    return (
      <div className="app">
        <div className="header">{this.props.title}</div>
        <Form addProfile={this.addProfile} />
        <CardBoard profiles={this.state.profiles} />
      </div>
    );
  }
}

export default App;
