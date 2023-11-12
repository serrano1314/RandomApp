import React from "react";
import { useState, useEffect } from "react";
import Axios from "../api/Axios";
import useRefreshToken from "../hooks/useRefreshToken";

const Users = () => {
  const refresh = useRefreshToken();
  const [users, setUsers] = useState();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await Axios.get("/users-demo", {
          signal: controller.signal,
        });
        console.log(response);
        isMounted && setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <div>
      <article>
        <h2>User List</h2>
        {users?.length ? (
          <ul>
            {users.map((user, i) => {
              <li key={i}>{user}</li>;
            })}
          </ul>
        ) : (
          <p>No users to display</p>
        )}
        <button
          onClick={() => {
            refresh();
          }}
        >
          Refresh
        </button>
      </article>
    </div>
  );
};

export default Users;
