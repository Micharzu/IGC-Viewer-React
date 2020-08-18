import React from "react";
import "./App.css";
import InputField from "./InputField";
import ContentGuard from "./ContentGuard";

import { DataProvider } from "./DataContext";

const App = () => {
  return (
    <DataProvider>
      <div className="app">
        <div className="title">
          <h2>IGC VIEWER</h2>
        </div>

        <InputField />
        <ContentGuard />
      </div>
    </DataProvider>
  );
};

export default App;
