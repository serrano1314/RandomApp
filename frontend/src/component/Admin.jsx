import React from "react";
import Users from "./Users";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section>
      <h1>Admins Page</h1>
      <div>
        <Users />
      </div>
      <div>
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Admin;
