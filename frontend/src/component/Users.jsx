import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Axios from "../api/Axios";
import { request } from "../api/Api";

const Users = () => {
  const { auth, setAuth } = useAuth();

  const [users, setUsers] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAdmin = async () => {
      const accessToken = auth.accessToken;
      try {
        const response = await request("get", "/admin", null, accessToken);
        console.log("Successful response:", response);
        isMounted && setUsers([response]);
      } catch (error) {
        console.log("Error response:", error.response);
        console.error(error);
        navigate("/", { state: { from: location }, replace: true });
      }
    };

    // getAdmin();

    const refresh = async () => {
      const refreshToken = auth.refreshToken;
      try {
        const response = await request(
          "post",
          "/auth/refresh-token",
          null,
          refreshToken
        );
        setAuth((prev) => {
          console.log(">>>>1", prev.accessToken);
          console.log(">>>>2", response.access_token);
          return { ...prev, accessToken: response.access_token };
        });
        console.log("Refresh Token Successful response:", auth);
      } catch (error) {
        console.log("Error response:", error.response);
        console.error(error);
        navigate("/", { state: { from: location }, replace: true });
      }
    };

    refresh();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
