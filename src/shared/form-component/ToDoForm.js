import React from "react";
import "./ToDoForm.css";

const ToDoForm = () => {
  return (
    <div>
      <label htmlFor="title">Title</label>
      <input
        className="input"
        name="title"
        id="title"
        type="text"
        placeholder="Add todo.."
      />
      <br />
      <label htmlFor="description">Description</label>
      <textarea
        className="input"
        name="description"
        id="description"
        placeholder="Add description..."
        style={{ height: "4em" }}
      ></textarea>
      <br />
      <label htmlFor="date">Date</label>
      <input
        className="input"
        type="date"
        id="date"
        min={new Date().toISOString().slice(0, 10)}
      />
    </div>
  );
};

export default ToDoForm;
