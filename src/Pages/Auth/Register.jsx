import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { REGISTER, baseURL } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import Form from "react-bootstrap/Form";
import google from "../../image/google_logo-google_icongoogle-512.webp";
import { useNavigate } from "react-router-dom";
const Register = () => {
  //ref
  const focus = useRef("");
  //states
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  //loading
  const [loading, setLoading] = useState(false);
  //err
  const [err, setErr] = useState("");
  //cookie
  const cookie = Cookie();
  // handle form Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  // handle focus
  useEffect(() => {
    focus.current.focus();
  }, []);
  // handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${REGISTER}`, form);
      setLoading(false);
      const token = res.data.token;
      // cookie.set("commerce", token ,{
      //   httpOnly : true,
      // });
      cookie.set("commerce", token);
      navigate("/dashboard/users", { replace: true });
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err.response.status === 422) {
        setErr("Email is already been taken.");
      } else {
        setErr("Internal server Err.");
      }
    }
  }
  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <div className="row" style={{ height: "100vh" }}>
          <Form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1>Register Now</h1>

              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  ref={focus}
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your Name...."
                  required
                />
                <Form.Label>Name</Form.Label>
              </Form.Group>

              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="email"
                  value={form.email}
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your Email...."
                  required
                />
                <Form.Label>Email</Form.Label>
              </Form.Group>

              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="password"
                  value={form.password}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter your Password...."
                  minLength="6"
                  required
                />
                <Form.Label>Password </Form.Label>
              </Form.Group>

              <button className="btn btn-primary">Register</button>
              <div className="google-btn">
                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-icon-wrapper">
                    <img
                      style={{ width: "50px", height: "50px" }}
                      className="google-icon"
                      src={google}
                      alt="sign in with google"
                    />
                  </div>
                  <p className="btn-text">
                    <b>Register in with google</b>
                  </p>
                </a>
              </div>
              {err !== "" && <span className="error">{err}</span>}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
