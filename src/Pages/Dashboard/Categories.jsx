import React, { useEffect, useState } from "react";
import { CAt, Cat } from "../../Api/Api";

import { Link } from "react-router-dom";

import TableShow from "../../Components/Dashboard/Table";
import { Axios } from "../../Api/axios";
const Categories = () => {
  const [categories, setCategories] = useState([]);

  // get data
  useEffect(() => {
    Axios.get(`/${Cat}`)

      .then((data) => setCategories(data.data))

      .catch((err) => console.log(err));
  }, []);
  //handleDelete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${CAt}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
      // setDeleteUser((prev) => !prev);
    } catch (err) {
      console.log("err", err);
    }
  }

  const header = [
    { keyy: "title", name: "Title" },
    { keyy: "image", name: "Image" },
  ];

  return (
    <div className="bg-1 w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Categories Page</h1>
        <Link className="btn1" to="/dashboard/category/add">
          Add Categories
        </Link>
      </div>
      <TableShow header={header} data={categories} delete={handleDelete} />
      {/* <Logout /> */}
    </div>
  );
};

export default Categories;

// const userShow = users.map((user, key) => (
//   <tr key={key}>
//     <td>{key + 1}</td>
//     <td>
//       {user.name === currentUser.name ? `${user.name}  (you)` : user.name}
//     </td>
//     <td>{user.email}</td>
//     <td>
//       {user.role === "1995"
//         ? "Admin"
//         : user.role === "2001"
//         ? "User"
//         : "Writer"}
//     </td>
//     <td>
//       <div className="d-flex align-items-center justify-content-center  gap-5">
//         <Link to={`${user.id}`}>
//           <FontAwesomeIcon
//             fontSize={"22px"}
//             color="#FBCF5F"
//             cursor={"pointer"}
//             icon={faUserPen}
//           />
//         </Link>
//         {currentUser.id !== user.id && (
//           <FontAwesomeIcon
//             onClick={() => handleDelete(user.id)}
//             cursor={"pointer"}
//             fontSize={"22px"}
//             color="red"
//             icon={faTrashCan}
//           />
//         )}
//       </div>
//     </td>
//   </tr>
// ));

// handleDelete
// const handleDelete = async (id) => {
//   if (currentUser.id !== id) {
//     try {
//       const res = await axios.delete(`${baseURL}/${Cat}/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setDeleteUser((prev) => !prev);
//     } catch (err) {
//       console.log("err", err);
//     }
//   }
// };
