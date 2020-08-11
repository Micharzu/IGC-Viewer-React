import React, { useEffect, useState } from "react";

const InputField = () => {
  //przykładowy plik
  const sampleFile =
    "https://xcportal.pl/sites/default/files/tracks/2020-06-09/069daro396091568.igc";
  //proxy
  const proxy = "https://cors-anywhere.herokuapp.com/";

  //aktywny plik igc
  const [file, setFile] = useState();
  //stan aktywnego url pliku igc
  const [fileURL, setFileURL] = useState(proxy + sampleFile);
  //stan inputa
  const [search, setSearch] = useState("");

  //zmie pobierz plik kiedy zmieni się stan pliku
  useEffect(() => {
    getFile();
  }, [fileURL]);

  const getFile = async () => {
    const response = await fetch(fileURL);
    const data = await response.text();

    console.log(data);
    setFile(data);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setFileURL(search);
    setSearch("");
  };

  return (
    <div>
      <form onSubmit={getSearch} className="urlInputForm">
        <h2>Wklej tutaj URL wybranego pliku .igc</h2>
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
