import { useState, useRef, useEffect } from "react";
const Login = () => {
  const [success, setSuccess] = useState(false);

  const userRef = useRef();
  //   const errRef = useRef();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(true);
    setUsernameInput("");
    setPasswordInput("");
    console.log(usernameInput, passwordInput);
  };

  return (
    <>
      <section className="my-section">
        {success ? (
          <div className="success">
            <div>
              <span>You Are Logged In!</span>
            </div>
            <div>
              <a href="">Go home</a>
            </div>
          </div>
        ) : (
          <>
            <form className="my-form" onSubmit={handleSubmit}>
              <h1>Login</h1>

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
                required
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
                required
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
            </form>
            <div className="">
              <div>Need an Account?</div>

              <a href="">Register Here.</a>
            </div>
          </>
        )}
      </section>
    </>
  );
};
export default Login;
