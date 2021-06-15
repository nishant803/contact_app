import React from "react";
import "./Addcontact.css";
class EditContact extends React.Component {
  constructor(props) {
    super(props);
    const { id, name, email } = props.location.state.contact;
    this.state = {
      id,
      name,
      email,
    };
  }
  update = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("Enter details");
      return;
    }
    this.props.updateContactHandler(this.state);
    console.log(this.state);
    this.setState({ name: "", email: "" });
    this.props.history.push("/");
  };
  render() {
    return (
      <>
        <form onSubmit={this.update} className="form">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={(e) => {
              this.setState({ name: e.target.value });
            }}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={(e) => {
              this.setState({ email: e.target.value });
            }}
          />

          <button className="btn">UPDATE</button>
        </form>
        <button onClick={() => this.props.history.push("/")} className="btn">
          Show Contact list
        </button>
      </>
    );
  }
}
export default EditContact;
