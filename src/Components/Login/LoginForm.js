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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    appContext.setError(false);
    const user = {
      email: email,
      password: password,
    };

    loginUser(user)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        appContext.setUser(res.data.user);
        setEmail("");
        setPassword("");
        setSignupSuccessful(false); // in case of user coming from sign-up
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        appContext.setError(err.response.data);
        return;
      });
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
      <div className="error-alert-login-modal">{appContext.error}</div>
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
              appContext.setError(false);
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
          <Loader classname={"loader-signin"} />
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
