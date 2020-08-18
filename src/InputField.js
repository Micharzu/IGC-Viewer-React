import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "./DataContext";
import "./InputField.css";

const InputField = () => {
  const { targetFile } = useContext(DataContext);

  const [flightFile, setFlightFile] = targetFile;

  //sampleFile
  const sampleFile =
    "https://xcportal.pl/sites/default/files/tracks/2020-06-09/069daro396091568.igc";
  //proxy
  const proxy = "https://cors-anywhere.herokuapp.com/";

  //state of URL of active igc file
  const [fileURL, setFileURL] = useState(proxy + sampleFile);

  //input state
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (fileURL.slice(-4) === ".igc") {
      getFile();
    }
  }, [fileURL]);

  const getFile = async () => {
    const response = await fetch(proxy + fileURL);
    setFlightFile(await response.text());
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    console.log(search);
    setFileURL(search);
    setSearch("");
  };

  return (
    <div>
      <form onSubmit={getSearch} className="urlInputForm">
        <h3>Wklej tutaj URL wybranego pliku .igc</h3>
        <div className="urlInputSection">
          <input
            className="urlInput"
            type="url"
            value={search}
            onChange={updateSearch}
          />
          <button className="urlInputButton" type="submit">
            Wybierz plik
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputField;
