import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allentry, setallentry] = useState([]);
  const handleForm = (e) => {
    e.preventDefault();
    if (email && password) {
      const mydata = { email, password };
      setallentry([...allentry, mydata]);
    } else {
      return alert("please enter details");
    }
  };
  return (
    <>
      <form onSubmit={handleForm}>
        <h1>Email</h1>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <h1>Password</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">submit</button>
      </form>
      {allentry.map((elem) => {
        return (
          <h1>
            {elem.email} {elem.password}
          </h1>
        );
      })}
    </>
  );
};

export default Login;
