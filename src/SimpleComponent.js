import React from "react";
import "./SimpleComponent.css";

const SimpleComponent = (props) => {
  return (
    <div className="componentRecord">
      <h3>{props.text}</h3>
      <h3>{props.value}</h3>
    </div>
  );
};

export default SimpleComponent;
