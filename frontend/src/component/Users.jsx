import { useState, useEffect } from "react";
import { useNavigate, useLocation, Await } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Axios from "../api/Axios";
import { request } from "../api/Api";
import useRefreshToken from "../hooks/useRefreshToken";

const Users = () => {
  const { auth, setAuth } = useAuth();

  const [users, setUsers] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const refresh = useRefreshToken();

  const handleRefresh = async () => {
    await refresh();
  };

  useEffect(() => {
    let isMounted = true;
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

    return () => {
      isMounted = false;
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
      <button onClick={handleRefresh}>Refresh</button>
    </article>
  );
};

export default Users;
