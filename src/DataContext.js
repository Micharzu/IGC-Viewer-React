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
  };

  const updateData = () => {
    if (flightFile) {
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

  const getFlightTimeInSecs = () => {
    let firstRec = timeInSecs(flightObject.flightData[0].slice(0, 6));
    let lastRec = timeInSecs(
      flightObject.flightData[flightObject.flightData.length - 1].slice(0, 6)
    );
    return lastRec - firstRec;
  };

  const timeInSecs = (timeStr) => {
    return (
      parseInt(timeStr.slice(0, 2)) * 3600 +
      parseInt(timeStr.slice(2, 4)) * 60 +
      parseInt(timeStr.slice(4, 6))
    );
  };

  const createContentObjects = () => {
    //time
    let flightTimeInSecs = getFlightTimeInSecs();

    let hours = Math.trunc(flightTimeInSecs / 3600);
    let seconds = flightTimeInSecs % 3600;
    let minutes = Math.trunc(seconds / 60);
    seconds = seconds % 60;

    let minPref = minutes >= 10 ? "" : 0;
    let secPref = seconds >= 10 ? "" : 0;

    let flightTimeStr = `${hours}:${minPref}${minutes}:${secPref}${seconds}`;

    //additionalObj base
    let {
      FRID,
      DTE,
      Sec,
      PLTPILOT,
      flightData,
      ...additionalObjTemp
    } = flightObject;

    //extending additionalObj

    additionalObjTemp.flightTime = {
      text: "Łączny czas lotu",
      value: flightTimeStr,
    };

    const getTimeString = (record) => {
      return `${record.slice(0, 2)}:${record.slice(2, 4)}:${record.slice(
        4,
        6
      )}`;
    };

    let firstRec = flightObject.flightData[0];
    let lastRec = flightObject.flightData[flightObject.flightData.length - 1];

    let flightStart = getTimeString(firstRec);
    let flightFinnish = getTimeString(lastRec);

    additionalObjTemp.flightStart = {
      text: "Odlot",
      value: flightStart,
    };
    additionalObjTemp.flightFinnish = {
      text: "Lądowanie",
      value: flightFinnish,
    };

    const getPositionStr = (strArr) => {
      const altitudeStr =
        strArr.slice(6, 8) +
        "° " +
        strArr.slice(8, 10) +
        "." +
        strArr.slice(10, 13) +
        "'" +
        strArr.slice(13, 14);

      const latitudeStr =
        strArr.slice(14, 17) +
        "° " +
        strArr.slice(17, 19) +
        "." +
        strArr.slice(19, 22) +
        "'" +
        strArr.slice(22, 23);

      const positionStr = altitudeStr + " " + latitudeStr;
      return positionStr;
    };

    additionalObjTemp.startingPosition = {
      text: "Miejsce odlotu",
      value: getPositionStr(firstRec),
    };

    additionalObjTemp.finishingPosition = {
      text: "Miejsce lądowania",
      value: getPositionStr(lastRec),
    };

    setAdditionalContentObject(additionalObjTemp);

    //mainObj
    let flightDate = `${flightObject.DTE.slice(0, 2)}/${flightObject.DTE.slice(
      2,
      4
    )}/20${flightObject.DTE.slice(4)}`;

    let filteredData = flightObject.flightData.filter((item, index) => {
      return index % 6 === 0;
    });
    if (
      filteredData[filteredData.length - 1] !==
      flightObject.flightData[flightObject.flightData.length - 1]
    ) {
      filteredData.push(
        flightObject.flightData[flightObject.flightData.length - 1]
      );
    }

    const mainObjectTemp = (({ FRID, Sec, PLTPILOT, flightData }) => ({
      PLTPILOT,
      flightDate,
      flightData,
      filteredData,
      flightTimeInSecs,
    }))(flightObject);
    setMainContentObject(mainObjectTemp);
  };

  const updateObjectData = () => {
    if (typeof flightData === "object") {
      flightObject.flightData = [];
      flightData.forEach((item, index) => {
        if (index === 0) {
          flightObject.FRID = item;
        }
        switch (item.charAt(0)) {
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
                flightObject.GTYGLIDERTYPE = {
                  text: "Typ lotni",
                  value: item.slice(i + characters),
                };
                break;
              }
              case "CCLCOMPETITION CLASS": {
                flightObject.CCLCOMPETITION_CLASS = {
                  text: "Typ zawodów",
                  value: item.slice(i + characters),
                };
                break;
              }
              case "TZNTIMEZONE": {
                flightObject.TZNTIMEZONE = {
                  text: "Strefa czasowa",
                  value: item.slice(i + characters),
                };
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
