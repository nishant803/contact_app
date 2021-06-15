import React from "react";
import { Link } from "react-router-dom";
function Contactcard(props) {
  const { id, name, email } = props.contact;
  return (
    <>
      <Link
        to={{
          pathname: `/contact/${id}`,
          state: { contact: props.contact },
        }}
      >
        <div>{name}</div>
        <div>{email}</div>
      </Link>
      <button
        style={{ cursor: "pointer" }}
        onClick={() => props.clickHandler(id)}
      >
        delete
      </button>
      <Link to={{ pathname: "/edit", state: { contact: props.contact } }}>
        <button style={{ cursor: "pointer" }}>UPDATE</button>
      </Link>
    </>
  );
}

export default Contactcard;
