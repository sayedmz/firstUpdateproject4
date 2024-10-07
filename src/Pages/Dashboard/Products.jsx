import React, { useEffect, useState } from "react";
import { PRO, Pro } from "../../Api/Api";
import { Link } from "react-router-dom";
import TableShow from "../../Components/Dashboard/Table";
import { Axios } from "../../Api/axios";
const Products = () => {
  const [Products, setProducts] = useState([]);
  console.log(Products);

  // get data
  useEffect(() => {
    Axios.get(`/${PRO}`)

      .then((data) => setProducts(data.data))

      .catch((err) => console.log(err));
  }, []);
  //handleDelete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${Pro}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
      // setDeleteUser((prev) => !prev);
    } catch (err) {
      console.log("err", err);
    }
  }

  const header = [
    { keyy: "title", name: "Title" },
    { keyy: "description", name: "Description" },
    { keyy: "price", name: "Price" },
    { keyy: "rating", name: "Rating" },
  ];

  return (
    <div className="bg-1 w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Products Page</h1>
        <Link className="btn1" to="/dashboard/product/add">
          Add Product
        </Link>
      </div>
      <TableShow header={header} data={Products} delete={handleDelete} />
      {/* <Logout /> */}
    </div>
  );
};

export default Products;
