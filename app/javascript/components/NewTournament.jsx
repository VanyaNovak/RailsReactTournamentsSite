import React from "react";
import { Link } from "react-router-dom";

class NewTournament extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      team: "",
      description: "",
      image: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/tournaments/create";
    const { name, team: team, description: description, image: image } = this.state;

    if (name.length == 0 || team.length == 0 || description.length == 0 || image.length == 0)
      return;

    const body = {
      name,
      team: team,
      description: description.replace(/\n/g, "<br> <br>"),
      image: image
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.props.history.push(`/tournament/${response.id}`))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add a new tournament.
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="tournamentName">Tournament name</label>
                <input
                  type="text"
                  name="name"
                  id="tournamentName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="TournamentTeam">Teams</label>
                <input
                  type="text"
                  name="team"
                  id="TournamentTeam"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
                <small id="TeamsHelp" className="form-text text-muted">
                  Separate each team with a comma.
                </small>
              </div>
              <label htmlFor="description">Tournament description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="5"
                required
                onChange={this.onChange}
              />
              <div>
                <label htmlFor="TournamentImage">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    id="TournamentImage"
                    className="form-control"
                    required
                    onChange={this.onChange}
                  />
                  <small id="TeamsHelp" className="form-text text-muted">
                    put here image URL
                  </small>
              </div>
              <button type="submit" className="btn custom-button mt-3">
                Create Tournament
              </button>
              <Link to="/tournaments" className="btn btn-link mt-3">
                Back to tournaments
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default NewTournament;