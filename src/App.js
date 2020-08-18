import React from "react";
import "./App.css";
import InputField from "./Input/InputField";
import ContentGuard from "./Content/ContentGuard";

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
