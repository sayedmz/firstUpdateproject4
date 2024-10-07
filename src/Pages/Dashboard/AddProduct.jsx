import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { Cat, Pro, baseURL } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const [form, setForm] = useState({
    category: "select category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const nav = useNavigate();
  console.log(images);
  useEffect(() => {
    Axios.get(`/${Cat}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);
  // handle submit

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("category", form.category);
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("price", form.price);
      data.append("discount", form.discount);
      data.append("About", form.About);
      for (let i = 0; i < images.length; i++) {
        data.append("images[]", images[i]);
      }
      const res = await Axios.post(`${Pro}/add`, data);
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  //handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //handle focus
  const focus = useRef("");
  useEffect(() => {
    focus.current.focus();
  }, []);
  // mapping
  // handle categories
  const categoriesShow = categories.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));

  // handle images
  const imagesShow = images.map((img, key) => (
    <div
      key={key}
      className="d-flex align-items-center justify-content-start gap-3 border w-100 p-2"
    >
      <img src={URL.createObjectURL(img)} width="250px"></img>
      {/* اذا كان نوع الملف   => هكذا يتم جلب الرابط لعرض الصورة  file*/}
      <div>
        <p className="mr-1">{img.name}</p>
        {/*Terra GB mb kbt bt  × 1024 */}
        <p>
          {img.size / 1024 < 1000
            ? (img.size / 1024).toFixed(2) + "KB"
            : (img.size / (1024 * 1024)).toFixed(2) + "MB"}
        </p>
      </div>
    </div>
  ));

  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="select">
          <Form.Label>Category</Form.Label>
          <Form.Select
            ref={focus}
            value={form.category}
            name="category"
            onChange={handleChange}
          >
            <option disabled>select category</option>
            {categoriesShow}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={form.title}
            name="title"
            required
            onChange={handleChange}
            type="text"
            placeholder="Title...."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={form.description}
            name="description"
            required
            onChange={handleChange}
            type="text"
            placeholder="Description...."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>price</Form.Label>
          <Form.Control
            value={form.price}
            name="price"
            required
            onChange={handleChange}
            type="text"
            placeholder="price...."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="discount">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            value={form.discount}
            name="discount"
            required
            onChange={handleChange}
            type="text"
            placeholder="discount...."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="About">
          <Form.Label>About</Form.Label>
          <Form.Control
            value={form.About}
            name="About"
            required
            onChange={handleChange}
            type="text"
            placeholder="About...."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            multiple
            onChange={(e) => setImages([...e.target.files])}
            type="file"
          />
        </Form.Group>
        <div className="d-flex flex-column align-items-start gap-3 p-2">
          {imagesShow}
        </div>
        <button
          // disabled={form.title.length > 2 ? false : true}
          className="btn-primary"
        >
          Save
        </button>
      </Form>
    </>
  );
};

export default AddProduct;

// const cookie = Cookie();
// const token = cookie.get("commerce");
// async function handleSubmit(e) {
//   setLoading(true);
//   e.preventDefault();
//   try {
//     const res = await axios.post(`${baseURL}/${Pro}/add`, form, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setLoading(false);
//     nav("/dashboard/products");
//   } catch (err) {
//     console.log(err);
//   }
// }
