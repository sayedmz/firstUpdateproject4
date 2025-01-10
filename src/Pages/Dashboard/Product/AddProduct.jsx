import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { Cat, Pro, baseURL } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
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
  const dummyData = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: "100",
    discount: "0",
    About: "About",
  };
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [id, setId] = useState("");
  // const [uploading, setUploading] = useState(0);
  const [categories, setCategories] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    Axios.get(`/${Cat}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);
  // handle Edit
  async function handleEdit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${Pro}/edit/${id}`, form);
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  // handle create form

  async function handleSubmitForm() {
    try {
      const res = await Axios.post(`${Pro}/add`, dummyData);
      setId(res.data.id);
    } catch (err) {
      console.log(err);
    }
  }

  //handle change categories
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(1);

    if (sent !== 1) {
      handleSubmitForm();
    }
  };
  //useRef
  // user id of image
  const ids = useRef([]);
  // console.log(ids);
  //useRef span
  const progress = useRef([]);
  // console.log(progress);
  //handle focus
  const focus = useRef("");
  useEffect(() => {
    focus.current.focus();
  }, []);
  // upload image
  const openImages = useRef(null);
  const uploadImages = () => {
    openImages.current.click();
  };
  // mapping
  // handle categories
  const categoriesShow = categories.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));
  // handle change image
  const j = useRef(-1);
  async function handleChangeImage(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imagesAsFiles = e.target.files;
    const data = new FormData();
    for (let i = 0; i < imagesAsFiles.length; i++) {
      j.current++; //  هنا مخصص لعد عدد  \span \ في يوز رف
      data.append("image", imagesAsFiles[i]);
      data.append("product_id", id);

      try {
        const res = await Axios.post("/product-img/add", data, {
          onUploadProgress: (progressEvents) => {
            // const loaded = progressEvents.loaded;
            // const total = progressEvents.total;
            const { loaded, total } = progressEvents;
            const percent = Math.floor((loaded * 100) / total);
            if (percent % 20 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute(
                "percent",
                `${percent}%`
              );
            }
          },
        });
        // console.log(res.data.id);
        ids.current[j.current] = res.data.id;
        // console.log(j.current);
      } catch (err) {
        console.log(err);
      }
    }
  }
  // handle delete
  async function handleDelete(indexID, img) {
    // هنا نفهم indexID = j.current  لانه يسيرو مع بعض وعلى نفس المجموعة الصور
    //  console.log("ids", ids.current[indexID]);
    //   console.log("id", indexID); // indexID == key in imagesShow = j.current =  index id of image dans array useRef ids
    // ids.current[indexID]  === id image
    const findId = ids.current[indexID];
    try {
      const res = await Axios.delete(`product-img/${findId}`);
      setImages((prev) => prev.filter((image) => image !== img));
      ids.current = ids.current.filter((id) => id !== findId);
      --j.current; // قمنا بلسب جي لكي تبقى نفس الرقم مع كي ويبقى الكود شغال
    } catch (err) {
      console.log(err);
    }
  }

  // show images
  const imagesShow = images.map((img, key) => (
    <div className="border w-100 p-2">
      <div
        key={key}
        className="d-flex align-items-center justify-content-between"
      >
        {/* {console.log("key", key)} */}
        <div className="d-flex align-items-center justify-content-start gap-3 ">
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
        <Button onClick={() => handleDelete(key, img)} variant="danger">
          Delete
        </Button>
      </div>
      <div className="custom-progress mt-2">
        <span
          ref={(e) => (progress.current[key] = e)} // كيفية ارجاع العنصر المطلوب في يوزرف
          // percent={`${uploading}%`}
          // style={{ width: `${uploading}%` }}
          className="inner-progress"
        ></span>
      </div>
    </div>
  ));

  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleEdit}>
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
            disabled={!sent}
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
            disabled={!sent}
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
            disabled={!sent}
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
            disabled={!sent}
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
            disabled={!sent}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            disabled={!sent}
            hidden
            ref={openImages}
            multiple
            onChange={handleChangeImage}
            type="file"
          />
        </Form.Group>
        <div
          style={{
            border: !sent ? "2px dashed gray" : "2px dashed #FFA500",
            cursor: sent && "pointer",
          }}
          className="d-flex align-items-center justify-content-center flex-column w-100"
          onClick={uploadImages}
        >
          <img
            src={require("../../../Assest/Untitled.png")}
            style={{ width: "150px", filter: !sent && "grayscale(1)" }}
            alt="upload"
          />
          <p className="fw-bold" style={{ color: !sent ? "gray" : "#FFA500" }}>
            Upload Images
          </p>
        </div>
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
