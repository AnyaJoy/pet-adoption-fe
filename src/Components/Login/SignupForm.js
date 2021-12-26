import "../../Styles/Signup.css";
import { useState, useContext } from "react";
import Loader from "../Loader";
import AppContext from "../../Context/AppContext";
import { signupUser } from "../RequestsDB";

function LoginForm({ setProfileExists, setSignupSuccessful }) {
  const appContext = useContext(AppContext);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [repassword, setRepassword] = useState();

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const newUser = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        repassword: repassword,
        type: "User",
        bio: "Change your bio...",
      };

      signupUser(newUser)

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setRepassword("");

      setLoading(false);
      setProfileExists(true);
      setSignupSuccessful(true);
    } catch (err) {
      console.log(err);
    }
  };

  function submitOnEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      handleSignup();
    }
  }

  return (
    <div className="signup-form-wrapper">
      <div className="header-signup">Register now to continue!</div>
      <div className="signin-and-first-time-here-wrapper">
        <span className="signin-header">Sign up.</span>
        <span>
          Have a profile? -&nbsp;
          <span
            className="signup-link"
            onClick={() => {
              setProfileExists(true);
            }}
          >
            Sign In
          </span>
        </span>
      </div>

      <form onSubmit={handleSignup} className="signup-form-wrapper">
        <div className="row1-input-descriptions">
          <span className="input-description">Fisrt name</span>
          <span className="input-description">Last name</span>
        </div>
        <div className="row-inputs-wrapper">
          <input
            required
            className="row-input"
            placeholder="Your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            required
            className="row-input"
            placeholder="Your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="input-description">E-mail</div>
        <input
          required
          className="input"
          placeholder="Your e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="row3-input-descriptions">
          <span className="input-description">Password</span>
          <span className="input-description">Confirm password</span>
        </div>
        <div className="row-inputs-wrapper">
          <input
            required
            className="row-input"
            type="password"
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            className="row-input"
            type="password"
            placeholder="Your password"
            onChange={(e) => setRepassword(e.target.value)}
            value={repassword}
            required
          />
        </div>
        {loading ? (
          <Loader classname={"loader"} />
        ) : (
          <button type="submit" className={`signup-button-${true}`}>
            Sign up
          </button>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
