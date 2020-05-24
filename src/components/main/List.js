import React, { useState } from "react";
import "./List.css";

import ListItem from "./ListItem";
import Modal from "../../shared/ui/Modal";
import ToDoForm from "../../shared/form-component/ToDoForm";
import add from "../../shared/svgImg/SVG/plus.svg";

const List = () => {
  const [toDoList, setToDoList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  const AddToDoHandler = (task) => {
    setToDoList((prevState) => [...prevState, task]);
  };

  const ListJsx = toDoList.map((toDoItem) => {
    return (
      <div>
        <ListItem
          title={toDoItem.title}
          key={Math.random().toString() + toDoItem.date}
        >
          {toDoItem.description}
        </ListItem>
      </div>
    );
  });

  return (
    <div className="list">
      <Modal show={showModal} hide={hideModalHandler} addTask={AddToDoHandler}>
        <ToDoForm />
      </Modal>
      <ul>{ListJsx}</ul>
      <button className="btn-add" onClick={showModalHandler}>
        <img src={add} alt="add-icon" className="add-icon" />
      </button>
    </div>
  );
};

export default List;
