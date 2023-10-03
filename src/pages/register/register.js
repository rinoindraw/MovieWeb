import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Update profile
      await updateProfile(res.user, {
        displayName,
      });

      // Navigate to the home page
      navigate("/");
    } catch (err) {
      console.log(err);
      setErr(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    const formContainer = document.querySelector(".formWrapper");
    const cardContainer = document.querySelector(".card");

    formContainer.classList.add("loaded");
    cardContainer.classList.add("loaded");
  }, []);

  return (
    <div className="registerFormContainer">
      <div className="formWrapper">
        <span className="logo">Let's Register</span>
        <span className="title">
          Please register to get the full experience from WebChat
        </span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Name ..." />
          <input required type="email" placeholder="Email ..." />
          <input required type="password" placeholder="Password ..." />
          <button disabled={loading}>Sign up</button>
          {loading && "Please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You already have an account?{" "}
          <Link to="/login" className="custom-link">
            Login
          </Link>
        </p>
      </div>
      <div className="img-wrapper">
        <div className="card"></div>
      </div>
    </div>
  );
};

export default Register;
