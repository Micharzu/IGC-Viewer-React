import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../DataContext";
import Content from "./Content";

const ContentGuard = () => {
  const { mContentObject, aContentObject } = useContext(DataContext);

  const [mainContentObj, setMainContentObj] = mContentObject;
  const [additionalContentObj, setAdditionalContentObj] = aContentObject;
  const [mainContentAvailable, setMainContentAvailable] = useState(false);
  const [additionalContentAvailable, setAdditionalContentAvailable] = useState(
    false
  );

  useEffect(() => {
    if (mainContentObj) {
      if (typeof mainContentObj === "object") {
        setMainContentAvailable(true);
      } else {
        setMainContentAvailable(false);
      }
    }
  }, [mainContentObj]);

  useEffect(() => {
    if (additionalContentObj) {
      if (typeof additionalContentObj === "object") {
        setAdditionalContentAvailable(true);
      } else {
        setAdditionalContentAvailable(false);
      }
    }
  }, [additionalContentObj]);

  return (
    <div>
      {mainContentAvailable && additionalContentAvailable && <Content />}
    </div>
  );
};

export default ContentGuard;
