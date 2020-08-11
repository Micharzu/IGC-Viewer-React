import React, { useState } from "react";
import "./App.css";
import InputField from "./InputField";

const App = () => {
  const [textfile, setTextfile] = useState("");

  const setFile = (data) => {
    if (data) {
      setTextfile(data);
      console.log(textfile);
    }
  };

  return (
    <div>
      <h2>IGC VIEWER</h2>
      <InputField setFile={setFile} />
    </div>
  );
};

export default App;
