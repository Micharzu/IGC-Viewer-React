import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "./DataContext";

import SimpleComponent from "./SimpleComponent";

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
  console.log(objf);

  return (
    <div>
      <div className="mainInfo">
        <SimpleComponent
          key={"PLTPILOT"}
          text={"Nazwa Pilota"}
          value={mainContentObj.PLTPILOT}
        />
        <SimpleComponent
          key={"flightDate"}
          text={"Data lotu"}
          value={mainContentObj.flightDate}
        />
      </div>
      <div className="additionalInfo">
        {Object.entries(additionalContentObj).map((prop) => (
          <SimpleComponent key={prop[0]} text={"sampletext"} value={prop[1]} />
        ))}
      </div>
    </div>
  );
};

export default Content;
