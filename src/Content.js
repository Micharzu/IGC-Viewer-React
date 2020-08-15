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

  const objf = Object.entries(additionalContentObj);

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
      <div className="graph">
        <Graph
          flightData={mainContentObj.flightData}
          flightTimeInSecs={mainContentObj.flightTimeInSecs}
        />
      </div>
      <div className="map" style={{ width: "80vw", height: "50vh" }}>
        <Map
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDrqc5R65cKDZMVxzoN172YnlLCGKiHNM4`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </div>
  );
};

export default Content;
