import React from "react";
import "App.css";
const Form = ({ handleSubmit, handleChange, onRegistr }) => (
  <form className="form" onSubmit={handleSubmit}>
    <input
      onChange={handleChange}
      name="username"
      className="input-username"
      defaultValue=""
      placeholder="Username"
      required={true}
    />
    <input
      onChange={handleChange}
      name="password"
      className="input-password"
      defaultValue=""
      placeholder="Password"
      required={true}
    />
    <button onSubmit={handleSubmit} className="btn-submit">
      Login
    </button>
    <button className="btn-submit" onClick={onRegistr}>
      Регистрация
    </button>
  </form>
);
export { Form };
