import React from "react";

const FormAuthUser = ({ userAuth, handleLogout }) => (
  <form className="form">
    <div>
      Hello, {userAuth?.username}{" "}
      <img className="avatar" src={userAuth?.avatar} alt={"..."} />
    </div>

    <button onClick={handleLogout} className="btn-submit">
      Logout
    </button>
  </form>
);
export { FormAuthUser };
