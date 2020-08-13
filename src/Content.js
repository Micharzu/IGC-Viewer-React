import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "./DataContext";

const Content = () => {
  const { mContentObject, aContentObject } = useContext(DataContext);

  const [mainContentObj, setMainContentObj] = mContentObject;
  const [additionalContentObj, setAdditionalContentObj] = aContentObject;

  const [displayMainContent, setDisplayMainContent] = useState("");

  useEffect(() => {
    if (mainContentObj) {
      console.log(mainContentObj.PLTPILOT);
      console.log(typeof mainContentObj);
      if (typeof mainContentObj === "object") {
        setDisplayMainContent(mainContentObj);
      } else {
        setDisplayMainContent("");
      }
    }
  }, [mainContentObj]);

  useEffect(() => {
    if (additionalContentObj) {
    }
  }, [additionalContentObj]);

  return (
    <div>
      <h3></h3>
    </div>
  );
};

export default Content;
