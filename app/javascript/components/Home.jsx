import React from "react";
import { Link } from "react-router-dom";

export default () => (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">CS:GO Tournaments</h1>
          <p className="lead">
            Play tournaments for real money and skins!
          </p>
          <hr className="my-4" />
          <Link
            to="/tournaments"
            className="btn btn-lg custom-button"
            role="button"
          >
            Log-in with steam
          </Link>
        </div>
      </div>
    </div>
);