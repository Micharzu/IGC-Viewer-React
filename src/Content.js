import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "./DataContext";

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

  useEffect(() => {
    if (displayAdditionalContent) {
      console.log("display more");
    }
  }, [displayAdditionalContent]);

  return (
    <div>
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
      <div className="additionalInfo">
        {Object.entries(additionalContentObj).map((prop) => (
          <SimpleComponent
            key={prop[0]}
            text={prop[1].text}
            value={prop[1].value}
            classAdded={"additionalInfo"}
          />
        ))}
      </div>
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
    </div>
  );
};

export default Content;
