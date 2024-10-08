import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../Api/axios";
import { USER, baseURL } from "../../Api/Api";
import Cookie from "cookie-universal";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
const User = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const params = useParams();
  const { id } = params;
  //   const id = Number(window.location.pathname.replace("/dashboard/users/", ""));
  //   console.log("id", id);
  const cookie = Cookie();
  const token = cookie.get("commerce");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}/${USER}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => {
        {
          setName(data.data.name);
          setEmail(data.data.email);
          setRole(data.data.role);
          setLoading(false);
        }
      })
      .then(() => setDisable(false))
      .catch(() => nav("/not/404", { replace: true }));
  }, []);

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseURL}/${USER}/edit/${id}`,
        {
          name: name,
          email: email,
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
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option disabled value="">
              Selected Role
            </option>
            <option value="1995">admin</option>
            <option value="2001">user</option>
            <option value="1996">writer</option>
          </Form.Select>
        </Form.Group>
        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
};

export default User;
