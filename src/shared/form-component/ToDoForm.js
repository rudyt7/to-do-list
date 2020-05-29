import React from "react";
import "./ToDoForm.css";

const ToDoForm = () => {
  return (
    <div className="form__container">
      <div>
        <label>Title</label>
        <br></br>
        <input
          className="input-title"
          name="title"
          id="title"
          type="text"
          placeholder="Title"
        />
        <br></br>
        <label>Description</label>
        <br></br>
        <textarea
          className="input-description"
          name="description"
          id="description"
          placeholder="Add a description (optional)"
        ></textarea>
      </div>
      <div>
        <label>Date</label>
        <br></br>
        <input
          className="input-date"
          type="date"
          id="date"
          min={new Date().toISOString().slice(0, 10)}
        />
        <br></br>
        <label>Type</label>
        <br></br>
        <select id="type" name="type" className="input-type">
          <option value="personal" defaultValue>
            Personal
          </option>
          <option value="work">Work</option>
          <option value="shopping">Shopping</option>
          <option value="others">Others</option>
        </select>
      </div>
    </div>
  );
};

export default ToDoForm;
