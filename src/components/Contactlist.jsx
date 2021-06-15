import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Contactcard from "./Contactcard";

export default function Contactlist(props) {
  const inputEl = useRef("");
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };
  const getSearchterm = () => {
    props.searchkeyword(inputEl.current.value);
  };
  const renderContactList = props.contacts.map((contact) => {
    return (
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Contactcard
          contact={contact}
          clickHandler={deleteContactHandler}
          key={contact.id}
        />
      </div>
    );
  });
  return (
    <div>
      <div>
        {renderContactList.length > 0 ? renderContactList : "No Contact found"}
      </div>
      <Link to="/add">
        <button>Add Contacts</button>
      </Link>
      <input
        ref={inputEl}
        type="text"
        name=""
        id=""
        placeholder="search"
        value={props.term}
        onChange={getSearchterm}
      />
    </div>
  );
}
