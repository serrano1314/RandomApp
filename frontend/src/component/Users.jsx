import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Axios from "../api/Axios";
import { refreshToken, request } from "../api/Api";

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
        isMounted && setUsers([response.data]);
      } catch (error) {
        console.log("Error response:", error.response);
        console.error(error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getAdmin();

    const refresh = async () => {
      console.log("REFRESH TOKEN");
      const response = await refreshToken(auth.refreshToken);
      console.log("REFRESH RESPONSE", response);
      setAuth((prev) => {
        console.log(">>>>1", prev.accessToken);
        console.log(">>>>2", response.data.access_token);
        return { ...prev, accessToken: response.access_token };
      });
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
