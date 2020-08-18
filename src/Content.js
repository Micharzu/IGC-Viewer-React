import React, { useState, useContext } from "react";
import { DataContext } from "./DataContext";
import "./Content.css";

import SimpleComponent from "./SimpleComponent";
import Graph from "./Graph";
import Map from "./Map";

const Content = () => {
  const { mContentObject, aContentObject } = useContext(DataContext);

  const [mainContentObj, setMainContentObj] = mContentObject;
  const [additionalContentObj, setAdditionalContentObj] = aContentObject;

  const [displayAdditionalContent, setDisplayAdditionalContent] = useState(
    false
  );
  const [contentManagerBtnText, setContentManagerBtnText] = useState(
    "Pokaż dodatkowe informacje"
  );

  const toggleContent = () => {
    if (displayAdditionalContent) {
      setDisplayAdditionalContent(false);
      setContentManagerBtnText("Pokaż dodatkowe informacje");
    } else {
      setContentManagerBtnText("Ukryj dodatkowe informacje");
      setDisplayAdditionalContent(true);
    }
  };

  return (
    <div className="content">
      <div className="mainInfo">
        <SimpleComponent
          key={"PLTPILOT"}
          text={"Nazwa Pilota"}
          value={mainContentObj.PLTPILOT}
          classAdded={"mainInfo"}
        />
        <SimpleComponent
          key={"flightDate"}
          text={"Data lotu"}
          value={mainContentObj.flightDate}
          classAdded={"mainInfo"}
        />
      </div>
      <button className="toggleBtn" onClick={toggleContent}>
        {contentManagerBtnText}
      </button>
      <div className="additionalInfo">
        {displayAdditionalContent && (
          <>
            {Object.entries(additionalContentObj).map((prop) => (
              <SimpleComponent
                key={prop[0]}
                text={prop[1].text}
                value={prop[1].value}
                classAdded={"additionalInfo"}
              />
            ))}
            <div className="features">
              <div className="graph">
                <Graph
                  flightData={mainContentObj.filteredData}
                  flightTimeInSecs={mainContentObj.flightTimeInSecs}
                />
              </div>
              <div className="map">
                <Map
                  flightData={mainContentObj.filteredData}
                  flightTimeInSecs={mainContentObj.flightTimeInSecs}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Content;
