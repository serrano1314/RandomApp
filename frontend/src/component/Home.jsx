import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import Axios from "../api/Axios";

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await Axios.request("auth/logout");

      setAuth({});
      navigate("/linkpage");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section>
        <h1>Home</h1>
        <br />
        <p>You are logged in!</p>
        <br />
        <Link to="/manager">Go to the Manager page</Link>
        <br />
        <Link to="/admin">Go to the Admin page</Link>
        <br />
        <Link to="/user">Go to the User</Link>
        <br />
        <Link to="/linkpage">Go to the link page</Link>
        <div className="flexGrow">
          <button onClick={logout}>Sign Out</button>
        </div>
      </section>
    </>
  );
};
export default Home;
