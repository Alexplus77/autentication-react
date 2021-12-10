import "App.css";
import React from "react";

const FormlReg = ({ handleRegistration, handleValueReg, formReg }) => {
  return (
    <form className="form" onSubmit={handleRegistration} ref={formReg}>
      <input
        onChange={handleValueReg}
        name="username"
        className="input-username"
        defaultValue=""
        placeholder="Username"
        required={true}
      />
      <input
        onChange={handleValueReg}
        name="password"
        className="input-password"
        defaultValue=""
        placeholder="Password"
        required={true}
      />
      <button onSubmit={handleRegistration} className="btn-submit">
        Зарегестрироваться
      </button>
    </form>
  );
};
export { FormlReg };
