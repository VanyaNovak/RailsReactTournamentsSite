import React from "react";
import { Link } from "react-router-dom";

class Tournaments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tournaments: []
    };
  }

  componentDidMount() {
    const url = "/api/v1/tournaments/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ tournaments: response }))
      .catch(() => this.props.history.push("/"));
  }
  render() {
    const { tournaments } = this.state;
    const allTournaments = tournaments.map((tournament, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <img
            src={tournament.image}
            className="card-img-top"
            alt={`${tournament.name} image`}
          />
          <div className="card-body">
            <h5 className="card-title">{tournament.name}</h5>
            <Link to={`/tournament/${tournament.id}`} className="btn custom-button">
              View Tournament
            </Link>
          </div>
        </div>
      </div>
    ));
    const noTournament = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No tournaments yet. Why not <Link to="/new_tournament">create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Tournaments for every occasion</h1>
            <p className="lead text-muted">
              We’ve pulled together our most popular tournaments, our latest
              additions, and our editor’s picks, so there’s sure to be something
              tempting for you to try.
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/tournament" className="btn custom-button">
                Create New Tournament
              </Link>
            </div>
            <div className="row">
              {tournaments.length > 0 ? allTournaments : noTournament}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }
}
export default Tournaments;