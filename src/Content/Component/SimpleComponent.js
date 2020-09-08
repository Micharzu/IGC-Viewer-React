//component displaying its values
import React from "react";
import "./SimpleComponent.css";

const SimpleComponent = (props) => {
  const classNames = ["componentRecord", props.classAdded].join(" ");
  return (
    <div className={classNames}>
      <h3>{props.text}</h3>
      <h3>{props.value}</h3>
    </div>
  );
};

export default SimpleComponent;
