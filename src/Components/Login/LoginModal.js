import React from "react";
import Modal from "react-modal";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const customStyles = {
  content: {
    top: "53%",
    left: "81%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function LoginModal() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [profileExists, setProfileExists] = useState(true);
  const [signupSuccessful, setSignupSuccessful] = useState(false)

  return (
    <div>
      <span
        onClick={() => {
          setIsOpen(true);
        }}
        className="login-button"
      >
        [➜ Login
      </span>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        style={customStyles}
      >
        {profileExists ? (
          <LoginForm setProfileExists={setProfileExists} signupSuccessful={signupSuccessful} setSignupSuccessful={setSignupSuccessful}/>
        ) : (
          <SignupForm setProfileExists={setProfileExists} setSignupSuccessful={setSignupSuccessful} />
        )}
      </Modal>
    </div>
  );
}

export default LoginModal;
