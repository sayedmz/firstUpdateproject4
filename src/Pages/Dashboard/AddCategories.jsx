import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";

import { CAt } from "../../Api/Api";

import Loading from "../../Components/Loading/Loading";
import { Axios } from "../../Api/axios";

const AddCategories = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const focus = useRef("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`/${CAt}/add`, form);
      window.location.pathname = "/dashboard/categories";
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  //handle focus
  useEffect(() => {
    focus.current.focus();
  }, []);
  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            ref={focus}
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title...."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files.item(0))}
          />
        </Form.Group>

        <button
          disabled={title.length > 2 ? false : true}
          className="btn btn-primary"
        >
          Save
        </button>
      </Form>
    </>
  );
};

export default AddCategories;
