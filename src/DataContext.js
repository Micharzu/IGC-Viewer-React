import React, { useState, useEffect, createContext } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [flightFile, setFlightFile] = useState("");
  const [flightData, setFlightData] = useState();
  const [flightObject, setFlightObject] = useState({});
  const [additionalContentObject, setAdditionalContentObject] = useState();
  const [mainContentObject, setMainContentObject] = useState();

  useEffect(() => {
    clearData();
    updateData();
  }, [flightFile]);

  useEffect(() => {
    updateObject();
  }, [flightData]);

  const clearData = () => {
    console.log("Clearing Data!");
    setFlightData();
    setFlightObject({});
    // setFlightObject({
    //   FRID: { registered: false, value: "" },
    //   Sec: { registered: false, value: "" },
    //   DTE: { registered: false, value: "" },
    //   PLTPILOT: { registered: false, value: "" },
    //   GTYGLIDERTYPE: { registered: false, value: "" },
    //   CIDCOMPETITIONID: { registered: false, value: "" },
    //   CCLCOMPETITION_CLASS: { registered: false, value: "" },
    //   TZNTIMEZONE: { registered: false, value: "" },
    //   flightData: [],
    // });
  };

  const updateData = () => {
    if (flightFile) {
      // console.log(flightFile);
      setFlightData(flightFile.split("\n"));
    }
  };

  const updateObject = async () => {
    if (flightData) {
      await updateObjectData();
      await checkFile();
      createContentObjects();
    }
  };

  const createContentObjects = () => {
    const {
      FRID,
      Sec,
      PLTPILOT,
      flightData,
      ...additionalObjTemp
    } = flightObject;
    setAdditionalContentObject(additionalObjTemp);

    const mainObjectTemp = (({ FRID, Sec, PLTPILOT, flightData }) => ({
      FRID,
      Sec,
      PLTPILOT,
      flightData,
    }))(flightObject);
    setMainContentObject(mainObjectTemp);
  };

  const updateObjectData = () => {
    // console.log(flightData);
    if (typeof flightData === "object") {
      flightObject.flightData = [];
      flightData.forEach((item, index) => {
        if (index === 0) {
          flightObject.FRID = item;
        }
        switch (item.charAt(0)) {
          // popraw
          case "B": {
            flightObject.flightData.push(item.slice(1));
            break;
          }
          case "G": {
            flightObject.Sec = item.slice(1);
            break;
          }
          case "H": {
            let i = item.indexOf(":");
            let isSpaceI = item.indexOf(": ") === i ? 1 : 0;
            let characters = isSpaceI + 1;

            switch (item.slice(2, i)) {
              case "GTYGLIDERTYPE": {
                flightObject.GTYGLIDERTYPE = item.slice(i + characters);
                break;
              }
              case "CIDCOMPETITIONID": {
                flightObject.CIDCOMPETITIONID = item.slice(i + characters);
                break;
              }

              case "CCLCOMPETITION CLASS": {
                flightObject.CCLCOMPETITION_CLASS = item.slice(i + characters);
                break;
              }
              case "TZNTIMEZONE": {
                flightObject.TZNTIMEZONE = item.slice(i + characters);
                break;
              }
              default: {
                if (item.includes("DTE")) {
                  if (i !== -1) {
                    flightObject.DTE = item.slice(
                      i + characters,
                      i + characters + 6
                    );
                    break;
                  }
                  flightObject.DTE = item.slice(5, 11);
                  break;
                }
                if (item.includes("PLTPILOT")) {
                  flightObject.PLTPILOT = item.slice(i + characters);
                  break;
                }
              }
            }
          }
        }
      });
    }
  };

  const checkFile = () => {
    try {
      if (flightObject.FRID.charAt(0) !== "A") {
        throw new Error("IGC file must contain an ID!");
      }
      if (!flightObject.Sec) {
        throw new Error("IGC file must contain a security code!");
      }
    } catch (e) {
      console.log("An error has occured: " + e.message);
    }
  };

  return (
    <DataContext.Provider
      value={{
        targetFile: [flightFile, setFlightFile],
        mContentObject: [mainContentObject, setMainContentObject],
        aContentObject: [additionalContentObject, setAdditionalContentObject],
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
