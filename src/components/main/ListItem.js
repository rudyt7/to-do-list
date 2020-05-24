import React from "react";
import "./ListItem.css";

const ListItem = (props) => {
  function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  if (isEmptyOrSpaces(props.title)) return false;

  return (
    <div className="list-item">
      <li>
        <div style={{ margin: "10px 0" }}>
          <div style={{ float: "right" }}>
            <button className="itembtn comp">&#10003;</button>
            <button className="itembtn del">&#10005;</button>
          </div>
          <h2>{props.title}</h2>
          {props.children}
        </div>
      </li>
    </div>
  );
};

export default ListItem;
