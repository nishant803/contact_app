import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { uuid } from "uuidv4";
import api from "./api/contact";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Addcontact from "./components/Addcontact";
import Contactlist from "./components/Contactlist";
import Contactdetail from "./components/Contactdetail";
import EditContact from "./components/EditContact";
function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [searchResult, setsearchResult] = useState("");
  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };
  //Retrieve Contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const removeContactHandler = async (id) => {
    let del = window.confirm("Are you sure");
    if (del) {
      await api.delete(`contacts/${id}`);
      const newList = contacts.filter((contact) => {
        return contact.id !== id;
      });
      setContacts(newList);
    }
  };
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };
  // const LOCAL_STORAGE_KEY = "contacts";
  useEffect(() => {
    //   const retriveItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //   if (retriveItems) setContacts(retriveItems);
    const getAllContacts = async () => {
      const allcontacts = await retrieveContacts();
      if (allcontacts) setContacts(allcontacts);
    };
    getAllContacts();
  }, []);

  const searchHandler = (searchTerm) => {
    setsearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setsearchResult(newContactList);
    } else {
      setsearchResult(contacts);
    }
  };
  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // }, [contacts]);

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Contactlist
                {...props}
                contacts={searchTerm.length < 1 ? contacts : searchResult}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchkeyword={searchHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <Addcontact {...props} addContactHandler={addContactHandler} />
            )}
          />
          <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />
          <Route path="/contact/:id" component={Contactdetail} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
