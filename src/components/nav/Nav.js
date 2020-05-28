import React, { useContext } from "react";
import "./Nav.css";

import { LabelContext } from "../../context/LabelContext";

const Nav = (props) => {
  const labelContext = useContext(LabelContext);

  const personalLabelHandler = () => {
    labelContext.setPersonalLabel();
  };
  const workLabelHandler = () => {
    labelContext.setWorkLabel();
  };
  const shoppingLabelHandler = () => {
    labelContext.setShoppingLabel();
  };
  const othersLabelHandler = () => {
    labelContext.setOthersLabel();
  };
  const removeLabelHandler = () => {
    labelContext.clearLabel();
  };

  return (
    <nav className="nav">
      <div>
        <p className="title">Labels</p>
        <button className="nav-btn" onClick={removeLabelHandler}>
          All
        </button>
        <br />
        <br />
        <button className="nav-btn" onClick={personalLabelHandler}>
          Personal
        </button>
        <br />
        <br />
        <button className="nav-btn" onClick={workLabelHandler}>
          Work
        </button>
        <br />
        <br />
        <button className="nav-btn" onClick={shoppingLabelHandler}>
          Shopping
        </button>
        <br />
        <br />
        <button className="nav-btn" onClick={othersLabelHandler}>
          Others
        </button>
        <br />
      </div>
    </nav>
  );
};

export default Nav;
