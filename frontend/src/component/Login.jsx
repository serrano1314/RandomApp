import { useState, useRef, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Axios from "../api/Axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login, request } from "../api/Api";

const LOGIN_URL = "/auth/authenticate";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [errMsg, setErrMsg] = useState("");

  const userRef = useRef();
  const errRef = useRef();
  const submitRef = useRef();

  const [usernameInput, setUsernameInput] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [passwordInput, setPasswordInput] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(usernameInput, passwordInput);

      console.log(response);
      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;
      const roles = [response.data.role];
      const user = response.data.user;
      console.log("AUTH>> ", accessToken, roles);
      setAuth({ user, passwordInput, roles, accessToken, refreshToken });
      setUsernameInput("");
      setPasswordInput("");
      navigate(from, { replace: true });
    } catch (error) {
      if (!error.response) {
        console.log("NO SERVER RESPONSE");
        setErrMsg("NO RESPONSE");
      } else if (error.response.status == 400) {
        console.log("Missing Username and Password");
        setErrMsg("Missing Username and Password");
      } else if (error.response.status == 401) {
        console.log("Unauthorized");
        setErrMsg("Invalid username or password");
      } else if (error.response.status == 403) {
        console.log("Forbidden");
        setErrMsg("Forbidden");
      } else {
        console.log("Login Failed");
      }
      console.log(error);
    }
  };

  return (
    <section className="my-section">
      <>
        <form className="my-form" onSubmit={handleSubmit}>
          <h1>Login</h1>

          <div className={errMsg !== "" ? "error" : ""}>{errMsg}</div>
          <label htmlFor="username">Username:</label>
          <input
            autoComplete="off"
            onChange={(e) => setUsernameInput(e.target.value)}
            value={usernameInput}
            ref={userRef}
            type="text"
            placeholder="your_username"
            id="username"
            // onFocus={() => setUserFocus(true)}
            // onBlur={() => setUserFocus(false)}
            // required
          />
          {/* <span className="">
                {validUser || usernameInput == "" || userFocus ? (
                  ""
                ) : (
                  <div>
                    {`4 to 24 Characters,`}
                    <br />
                    {`Must Begin with a letter`}
                    <br />
                    {`Letters, numbers, underscores, hypens allowed`}
                  </div>
                )}
              </span> */}

          <label htmlFor="password">Password:</label>
          <input
            onChange={(e) => setPasswordInput(e.target.value)}
            value={passwordInput}
            type="password"
            placeholder="********"
            name=""
            id="password"
            // onFocus={() => setPasswordFocus(true)}
            // onBlur={() => setPasswordFocus(false)}
            // required
          />
          {/* <span className="">
                {validPassword || passwordInput == "" || passwordFocus ? (
                  ""
                ) : (
                  <div>
                    {`8 to 24 characters`}
                    <br />
                    {`Must include uppercase and lowercase letters, a number and a special character`}
                    <br />
                    {`Allowed special characters: ! @ # $ %`}
                  </div>
                )}
              </span> */}

          <button
            // ref={submitRef}
            className="reg-btn"
            // onClick={handleSubmit}
            //   disabled={!(validMatch && validPassword && validUser)}
          >
            Login
          </button>
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Trust This Device</label>
        </form>
        <div className="">
          <div>Need an Account?</div>

          <a href="">Register Here.</a>
        </div>
      </>
    </section>
  );
};
export default Login;
