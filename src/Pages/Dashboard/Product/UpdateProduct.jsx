import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { Cat, Pro } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [form, setForm] = useState({
    category: "select category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  console.log(form);

  const [images, setImages] = useState([]);
  const [imagesFromServer, setImagesFromServer] = useState([]);
  const [idFromServer, setIdFromServer] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(idFromServer);
  const params = useParams();
  const { id } = params;
  // const [uploading, setUploading] = useState(0);
  const [categories, setCategories] = useState([]);
  const nav = useNavigate();

  // get data
  useEffect(() => {
    Axios.get(`/${Pro}/${id}`)

      .then((data) => {
        setForm(data.data[0]);
        setImagesFromServer(data.data[0].images);
      })

      .catch((err) => console.log(err));
  }, []);
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
      // delet image with edit
      for (let i = 0; i < idFromServer.length; i++) {
        await Axios.delete(`product-img/${idFromServer[i]}`);
      }
      await Axios.post(`${Pro}/edit/${id}`, form);
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  //handle change categories
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
  // handle imagesFromServer delete
  async function handleDeleteFromServer(id) {
    setImagesFromServer((prev) => prev.filter((img) => img.id !== id));
    setIdFromServer((prev) => {
      return [...prev, id];
    });

    // try {
    //   const res = await Axios.delete(`product-img/${id}`);
    // } catch (err) {
    //   console.log(err);
    // }
  }

  // show setImagesFromServer
  const imagesFromServerShow = imagesFromServer.map((img, key) => (
    <div className="border w-100 p-2">
      <div
        key={key}
        className="d-flex align-items-center justify-content-between"
      >
        <div className="d-flex align-items-center justify-content-start gap-3 ">
          <img alt="" src={img.image} width="250px"></img>
        </div>
        <Button onClick={() => handleDeleteFromServer(img.id)} variant="danger">
          Delete
        </Button>
      </div>
    </div>
  ));

  // handle images delete
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
          <img alt="" src={URL.createObjectURL(img)} width="250px"></img>
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
          ref={(e) => (progress.current[key] = e)}
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
            hidden
            ref={openImages}
            multiple
            onChange={handleChangeImage}
            type="file"
          />
        </Form.Group>
        <div
          style={{
            border: "2px dashed #FFA500",
            cursor: "pointer",
          }}
          className="d-flex align-items-center justify-content-center flex-column w-100"
          onClick={uploadImages}
        >
          <img
            src={require("../../../Assest/Untitled.png")}
            style={{ width: "150px" }}
            alt="upload"
          />
          <p className="fw-bold" style={{ color: "#FFA500" }}>
            Upload Images
          </p>
        </div>
        <div className="d-flex flex-column align-items-start gap-3 p-2">
          {imagesShow}
        </div>
        <div className="d-flex flex-column align-items-start gap-3 p-2">
          {imagesFromServerShow}
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

export default UpdateProduct;
