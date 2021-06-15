import React from "react";
import user from "../images/user.jpg";
function Contactdetail(props) {
  console.log(props);
  const { name, email } = props.location.state.contact;
  return (
    <div>
      <img src={user} alt="user" />
      <div>{name}</div>
      <div>{email}</div>
      <button onClick={() => props.history.push("/")}>Back to list</button>
    </div>
  );
}

export default Contactdetail;
