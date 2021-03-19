import React from "react";


function User({ name }) {
  return (
    <div className="user">
      <div className="nickname">{name}</div>
      <div className="avatar"><img src={"e.avatar"} alt="User avatar"/></div>
    </div>
  );
}

export default User;