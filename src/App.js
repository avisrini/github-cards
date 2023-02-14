import React from "react";
import axios from "axios";
import { useState } from "react";
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

const Card = (props) => {
  return (
    <div className="github-card">
      <img className="avatar" src={props.avatar_url} alt="avatar"></img>
      <div className="info">
        <div className="userName">{props.name}</div>
        <div className="company">{props.company}</div>
      </div>
    </div>
  );
};

const CardBoard = (props) => {
  return (
    <div className="card-board">
      {props.profiles.map((profile) => (
        <Card key={profile.id} {...profile} />
      ))}
    </div>
  );
};

const Form = (props) => {
  const [userName, setUserName] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setUserName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `https://api.github.com/users/${userName}`
    );
    props.addProfile(response.data);
    setUserName("");
  };

  return (
    <form>
      <input type="text" onChange={handleChange} value={userName}></input>
      <button onClick={handleSubmit}>Add card</button>
    </form>
  );
};

const App = (props) => {
  const [profiles, setProfiles] = useState([]);

  const addProfile = (profile) => {
    const oldProfiles = profiles;
    setProfiles([...oldProfiles, profile]);
  };

  return (
    <div className="app">
      <div className="header">{props.title}</div>
      <Form addProfile={addProfile} />
      <CardBoard profiles={profiles} />
    </div>
  );
};

export default App;
