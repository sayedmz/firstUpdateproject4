import axios from "axios";
import React, { useState } from "react";
import { LOGIN, baseURL } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import google from "../../image/google_logo-google_icongoogle-512.webp";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
const Login = () => {
  //states
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // handle form Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  //loading
  const [loading, setLoading] = useState(false);
  //cookie
  const cookie = Cookie();
  //err
  const [err, setErr] = useState("");
  // handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${LOGIN}`, form);
      setLoading(false);
      const token = res.data.token;
      cookie.set("commerce", token);
      // navigate("/dashboard/users", { replace: true });
      window.location.pathname = "/dashboard/users";
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        setErr("wrong email or password");
      } else {
        setErr("Internal serval Error");
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
              <h1>Login</h1>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  value={form.email}
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter your Email...."
                  required
                />
                <Form.Label>Email:</Form.Label>
              </Form.Group>

              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
                  value={form.password}
                  name="password"
                  onChange={handleChange}
                  type="password"
                  placeholder="Enter your password...."
                  required
                  minLength="6"
                />
                <Form.Label>Password:</Form.Label>
              </Form.Group>
              <button className="btn-primary">Submit</button>

              <div className="google-btn" style={{ width: "185px" }}>
                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-icon-wrapper">
                    <img
                      style={{ width: "50px", height: "50px" }}
                      className="google-icon"
                      src={google}
                      alt="sign in with google"
                    />
                  </div>
                  <p className="btn-text2">
                    <b>sign in with google</b>
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

export default Login;
