import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";

import { USER, baseURL } from "../../Api/Api";
import Cookie from "cookie-universal";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const cookie = Cookie();
  const token = cookie.get("commerce");

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseURL}/${USER}/add`,
        {
          name: name,
          email: email,
          password: password,
          role: role,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.location.pathname = "/dashboard/users";
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name...."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email....."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>password</Form.Label>
          <Form.Control
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password....."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option disabled value="">
              Selected Role
            </option>
            <option value="1995">admin</option>
            <option value="2001">user</option>
            <option value="1996">writer</option>
            <option value="1999">Product Manger</option>
          </Form.Select>
        </Form.Group>
        <button
          disabled={
            name.length > 2 &&
            email.length > 3 &&
            password.length > 6 &&
            role !== ""
              ? false
              : true
          }
          className="btn btn-primary"
        >
          Save
        </button>
      </Form>
    </>
  );
};

export default AddUser;
