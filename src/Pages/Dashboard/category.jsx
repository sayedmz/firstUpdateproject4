import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../Api/axios";
import { CAt } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
const Category = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const params = useParams();
  const { id } = params;
  //   const id = Number(window.location.pathname.replace("/dashboard/users/", ""));
  //   console.log("id", id);

  useEffect(() => {
    setLoading(true);
    Axios.get(`${CAt}/${id}`)
      .then((data) => {
        {
          setTitle(data.data.title);
          setLoading(false);
        }
      })
      .then(() => setDisable(false))
      .catch(() => nav("/not/404", { replace: true }));
  }, []);

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${CAt}/edit/${id}`, form);
      window.location.pathname = "/dashboard/categories";
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
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="title...."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files.item(0))}
          />
        </Form.Group>
        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
};

export default Category;
