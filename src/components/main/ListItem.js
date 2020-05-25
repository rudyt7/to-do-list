import React from "react";
import "./ListItem.css";

const ListItem = (props) => {
  function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  // let listItem = null;

  if (isEmptyOrSpaces(props.title)) {
    return false;
  } else {
    // switch (props.type) {
    //     case 'personal':
    //       break;
    //     case 'work':
    //       break;
    //     case 'shopping':
    //       break;
    //     case 'others':
    //       break;
    //     default:
    //       break;
    // }
  }

  function handleOngoing() {}

  function handleComplete() {}

  function handleDelete() {}

  return (
    <li className="list-item" id="list-item">
      <div style={{ float: "right" }}>
        <button
          className="itembtn ongoing"
          data-hover="Ongoing"
          onClick={() => handleOngoing()}
        >
          O
        </button>
        <button
          className="itembtn comp"
          data-hover="Complete"
          onClick={() => handleComplete()}
        >
          &#10003;
        </button>
        <button
          className="itembtn del"
          data-hover="Delete"
          onClick={() => handleDelete()}
        >
          &#10005;
        </button>
      </div>
      <h1>{props.title}</h1>
      {props.children}
    </li>
  );
};

export default ListItem;
