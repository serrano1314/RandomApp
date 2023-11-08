import { useEffect, useRef, useState } from "react";
import Axios from "./api/Axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/api/v1/auth/signup";

const Register = () => {
  const userRef = useRef();
  //   const errRef = useRef();
  const submitRef = useRef();

  const [usernameInput, setUsernameInput] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [passwordInput, setPasswordInput] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchInput, setMatchInput] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  //   const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(usernameInput);
    console.log(usernameInput);
    console.log(result);
    setValidUser(result);
  }, [usernameInput]);

  useEffect(() => {
    const result = PWD_REGEX.test(passwordInput);
    console.log(passwordInput);
    console.log(result);
    setValidPassword(result);

    const matchResult = passwordInput === matchInput;
    console.log("MATCH: " + matchResult);
    setValidMatch(matchResult);
  }, [passwordInput, matchInput]);

  useEffect(() => {
    submitRef.current.disabled = !(validMatch && validUser && validPassword);
  }, [validMatch, validUser, validPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitRef.current.disabled = !(validMatch && validUser && validPassword);
    const v1 = USER_REGEX.test(usernameInput);
    const v2 = PWD_REGEX.test(passwordInput);
    if (!v1 || !v2) {
      console.log("INVALID ENTRY");
      return;
    }
    console.log(usernameInput, passwordInput);

    try {
      const response = await Axios.post(
        REGISTER_URL,
        {
          firstname: "testonly",
          lastname: "testonly2",
          email: usernameInput,
          password: passwordInput,
        },
        {
          headers: {
            "Content-Type": "application/json", // Set the Content-Type header explicitly
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setSuccess(true);
      return;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <section className="my-section">
        {success ? (
          <div className="success">
            <span>success</span>
          </div>
        ) : (
          <>
            <form className="my-form" onSubmit={handleSubmit}>
              <h1>Register</h1>

              <label htmlFor="username">Username:</label>
              <input
                autoComplete="off"
                onChange={(e) => setUsernameInput(e.target.value)}
                ref={userRef}
                type="text"
                placeholder="your_username"
                id="username"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                required
              />
              <span className="">
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
              </span>

              <label htmlFor="password">Password:</label>
              <input
                onChange={(e) => setPasswordInput(e.target.value)}
                type="password"
                placeholder="********"
                name=""
                id="password"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                required
              />
              <span className="">
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
              </span>

              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                onChange={(e) => setMatchInput(e.target.value)}
                type="password"
                placeholder="********"
                name=""
                id="confirmPassword"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                required
              />
              <span className="">
                {validMatch || matchInput == "" || matchFocus ? (
                  ""
                ) : (
                  <div>{"Must match the first password input field."}</div>
                )}
              </span>

              <button
                ref={submitRef}
                className="reg-btn"
                // onClick={handleSubmit}
                //   disabled={!(validMatch && validPassword && validUser)}
              >
                Register
              </button>
            </form>
            <div className="">
              <div>Already Registered?</div>
            </div>
          </>
        )}
        <a href="">Sign in</a>
      </section>
    </>
  );
};

export default Register;
