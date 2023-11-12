import React from "react";

import { Link } from "react-router-dom";

const LinkPage = () => {
  return (
    <section>
      <h1>Links</h1>
      <br />
      <h2>Public</h2>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
      <br />
      <h2>Private</h2>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/admin">Admin Page</Link>
      </div>
      <div>
        <Link to="/manager">Manager Page</Link>
      </div>
      <div>
        <Link to="/user">User Page</Link>
      </div>
    </section>
  );
};

export default LinkPage;
