import "../../Styles/Login.css";
import { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import Loader from "../Loader";
import { loginUser } from "../RequestsDB";

function LoginForm({
  setProfileExists,
  signupSuccessful,
  setSignupSuccessful,
}) {
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogIn = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const user = {
        email: email,
        password: password,
      };

      loginUser(user, appContext.setUser);

      setEmail("");
      setPassword("");

      setSignupSuccessful(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  function submitOnEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      handleLogIn();
    }
  }

  return (
    <div className="login-form-wrapper">
      <div className={`signup-successful-${signupSuccessful}`}>
        Signed up successfully. Please sign in!
      </div>
      <div className="header-login">
        There are hundreds of pets waiting for a family right now. Let's find
        yours!
      </div>

      <div className="signin-and-first-time-here-wrapper">
        <span className="signin-header">Sign in.</span>
        <span>
          First time here? -&nbsp;
          <span
            className="signup-link"
            onClick={() => {
              setProfileExists(false);
            }}
          >
            Sign Up
          </span>
        </span>
      </div>

      <form onSubmit={handleLogIn} className="login-form-wrapper">
        <div className="input-description">E-mail</div>
        <input
          required
          className="input"
          placeholder="Your e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <div className="input-description">Password</div>
        <input
          required
          className="input"
          type="password"
          placeholder="Your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>

        {loading ? (
          <Loader classname={"loader"} />
        ) : (
          <button type="submit" className={`signin-button-${true}`}>
            Sign in
          </button>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
