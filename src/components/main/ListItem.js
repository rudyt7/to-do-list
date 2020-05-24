import React from "react";
import "./ListItem.css";

const ListItem = (props) => {
  function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  if (isEmptyOrSpaces(props.title)) return false;

  return (
    <li className="list-item" id="list-item">
      <div style={{ float: "right" }}>
        <button className="itembtn comp">&#10003;</button>
        <button className="itembtn del">&#10005;</button>
      </div>
      <h2>{props.title}</h2>
      {props.children}
    </li>
  );
};

export default ListItem;
