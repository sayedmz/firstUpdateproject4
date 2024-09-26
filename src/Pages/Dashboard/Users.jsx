import React, { useEffect, useState } from "react";
import { USER, USERS, baseURL } from "../../Api/Api";

import { Link } from "react-router-dom";
import axios from "axios";
import Cookie from "cookie-universal";
import TableShow from "../../Components/Dashboard/Table";
import { Axios } from "../../Api/axios";
const Users = () => {
  const cookie = Cookie();
  const token = cookie.get("commerce");
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [noUser, setNoUsers] = useState(false);
  const [deleteUse, setDeleteUser] = useState(false);

  //currentUser
  useEffect(() => {
    Axios.get(`/${USER}`).then((res) => setCurrentUser(res.data));
  }, []);
  // get data
  useEffect(() => {
    // Axios.get(`/${USERs}`)
    Axios.get(`/${USERS}`)
      .then((data) => setUsers(data.data))
      .then(() => setNoUsers(true))
      .catch((err) => console.log(err));
  }, [deleteUse]);

  //handleDelete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      // setUsers((prev) => prev.filter((item) => item.id !== id));
      setDeleteUser((prev) => !prev);
    } catch (err) {
      console.log("err", err);
    }
  }

  const header = [
    { keyy: "name", name: "UserName" },
    { keyy: "email", name: "Email" },
    { keyy: "role", name: "Role" },
  ];

  return (
    <div className="bg-1 w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>User Page</h1>
        <Link className="btn1" to="/dashboard/user/add">
          Add User
        </Link>
      </div>

      <TableShow
        header={header}
        data={users}
        delete={handleDelete}
        currentUser={currentUser}
      />

      {/* <Logout /> */}
    </div>
  );
};

export default Users;

// // filter User اذا اردنا الا نعرض المستخدم المسجل
// // const userFilter = users.filter((user) => user.id !== currentUser.id);
// // mapping on users
// const userShow = users.map((user, key) => (
//   <tr key={key}>
//     <td>{key + 1}</td>
//     <td>
//       {user.name === currentUser.name ? `${user.name}  (you)` : user.name}
//     </td>
//     <td>{user.email}</td>

//     <td></td>
//   </tr>
// ));
