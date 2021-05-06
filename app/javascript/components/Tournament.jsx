import React from "react";
import { Link } from "react-router-dom";

class Tournament extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tournament: { team: "" } };

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ tournament: response }))
      .catch(() => this.props.history.push("/tournaments"));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  render() {
    const { tournament: tournament } = this.state;
    let teamList = "No teams available";

    if (tournament.team.length > 0) {
      teamList = tournament.team
        .split(",")
        .map((team, index) => (
          <li key={index} className="list-group-item">
            {team}
          </li>
        ));
    }
    const tournamentDescription = this.addHtmlEntities(tournament.description);

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={tournament.image}
            alt={`${tournament.name} image`}
            className="img-fluid position-absolute"
          />
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {tournament.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Teams</h5>
                {teamList}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2">Tournament description</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${tournamentDescription}`
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger">
                Delete Tournament
              </button>
            </div>
          </div>
          <Link to="/tournaments" className="btn btn-link">
            Back to tournaments
          </Link>
        </div>
      </div>
    );
  }

}

export default Tournament;