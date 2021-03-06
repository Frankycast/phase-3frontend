import React, { Component } from "react";

export default class SignUp extends Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:9393/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((r) => r.json())
      .then((potentialUser) => {
        if (!potentialUser.error) {
          this.props.setUser(potentialUser);
        } else {
          alert(potentialUser.error);
        }
      });
  };

  render() {
    console.log(this.state)
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">New Username:</label>
        <input
          type="text"
          name="username"
          placeholder="New username"
          onChange={this.handleChange}
          value={this.state.username}
        /><br/>
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          name="password"
          placeholder="New password"
          onChange={this.handleChange}
          value={this.state.password}
        /><br/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
