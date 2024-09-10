import React, { useEffect, useState } from "react";
import { USER, USERS, baseURL } from "../../Api/Api";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookie from "cookie-universal";
const Users = () => {
  const cookie = Cookie();
  const token = cookie.get("commerce");
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [noUser, setNoUsers] = useState(false);
  const [deleteUse, setDeleteUser] = useState(false);

  //currentUser
  useEffect(() => {
    axios
      .get(`${baseURL}/${USER}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCurrentUser(res.data));
  }, []);
  // get data
  useEffect(() => {
    // Axios.get(`/${USER}`)
    axios
      .get(`${baseURL}/${USERS}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((data) => setUsers(data.data))
      .then(() => setNoUsers(true))
      .catch((err) => console.log(err));
  }, [deleteUse]);
  // filter User اذا اردنا الا نعرض المستخدم المسجل
  // const userFilter = users.filter((user) => user.id !== currentUser.id);
  // mapping on users
  const userShow = users.map((user, key) => (
    <tr key={key}>
      <td>{key + 1}</td>
      <td>
        {user.name === currentUser.name ? `${user.name}  (you)` : user.name}
      </td>
      <td>{user.email}</td>
      <td>
        {user.role === "1995"
          ? "Admin"
          : user.role === "2001"
          ? "User"
          : "Writer"}
      </td>
      <td>
        <div className="d-flex align-items-center justify-content-center  gap-5">
          <Link to={`${user.id}`}>
            <FontAwesomeIcon
              fontSize={"22px"}
              color="#FBCF5F"
              cursor={"pointer"}
              icon={faUserPen}
            />
          </Link>
          {currentUser.id !== user.id && (
            <FontAwesomeIcon
              onClick={() => handleDelete(user.id)}
              cursor={"pointer"}
              fontSize={"22px"}
              color="red"
              icon={faTrashCan}
            />
          )}
        </div>
      </td>
    </tr>
  ));
  // handleDelete
  const handleDelete = async (id) => {
    if (currentUser.id !== id) {
      try {
        const res = await axios.delete(`${baseURL}/${USER}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDeleteUser((prev) => !prev);
      } catch (err) {
        console.log("err", err);
      }
    }
  };

  return (
    <div className="bg-1 w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>User Page</h1>
        <Link className="btn1" to="/dashboard/user/add">
          Add User
        </Link>
      </div>
      <Table style={{ textAlign: "center" }} striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colspan={12} style={{ color: "#F3731D", fontSize: "20px" }}>
                Loading.....
              </td>
            </tr>
          ) : users.length <= 0 && noUser ? (
            <tr>
              <td colspan={12} style={{ color: "#F3731D", fontSize: "20px" }}>
                Not Users Fond
              </td>
            </tr>
          ) : (
            userShow
          )}
        </tbody>
      </Table>
      {/* <Logout /> */}
    </div>
  );
};

export default Users;
