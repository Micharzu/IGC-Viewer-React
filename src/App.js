import React from "react";
import "./App.css";
import InputField from "./InputField";
import ContentGuard from "./ContentGuard";

import { DataProvider } from "./DataContext";

const App = () => {
  return (
    <DataProvider>
      <div>
        <h2>IGC VIEWER</h2>

        <InputField />
        <ContentGuard />
      </div>
    </DataProvider>
  );
};

export default App;
