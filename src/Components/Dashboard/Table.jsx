import { faTrashCan, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../../Api/axios";

function TableShow(props) {
  const currentUser = props.currentUser || { email: "" };

  //header Show
  const headerShow = props.header.map((item, key) => <th>{item.name}</th>);
  //body Show
  const dataShow = props.data.map((items1, key) => (
    <tr key={key}>
      <td>{key + 1}</td>
      {props.header.map((items2, key2) => (
        <td key={key2}>
          {items1[items2.keyy] === "1995" ? (
            "Admin"
          ) : items1[items2.keyy] === "1996" ? (
            "Writer"
          ) : items1[items2.keyy] === "2001" ? (
            "User"
          ) : items1[items2.keyy] === "1999" ? (
            "Product Manger"
          ) : items2.keyy === "image" ? (
            <img width={"200px"} src={items1[items2.keyy]} alt="error" />
          ) : (
            items1[items2.keyy]
          )}

          {currentUser &&
            items1[items2.keyy] === currentUser.email &&
            `  (you)`}
        </td>
      ))}
      <td>
        <div className="d-flex align-items-center justify-content-center  gap-5">
          <Link to={`${items1.id}`}>
            <FontAwesomeIcon
              fontSize={"22px"}
              color="#FBCF5F"
              cursor={"pointer"}
              icon={faUserPen}
            />
          </Link>
          {currentUser.email !== items1.email && (
            <FontAwesomeIcon
              onClick={() => props.delete(items1.id)}
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
  //return data
  return (
    <Table style={{ textAlign: "center" }} striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          {headerShow}
          <th>Action</th>
        </tr>
        {props.data.length === 0 && (
          <tr>
            <td colspan={12} style={{ color: "#F3731D", fontSize: "20px" }}>
              Loading......
            </td>
          </tr>
        )}
      </thead>
      <tbody>{dataShow}</tbody>
    </Table>
  );
}

export default TableShow;
{
  /* <tbody>
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
      </tbody> */
}
