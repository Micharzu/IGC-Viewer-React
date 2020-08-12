import React, { useState, useEffect, createContext } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [flightFile, setFlightFile] = useState("");
  const [flightData, setFlightData] = useState();
  const [flightObject, setFlightObject] = useState({
    FRID: { registered: false, value: "" },
    Sec: { registered: false, value: "" },
    flightData: [],
    DTE: { registered: false, value: "" },
    PLTPILOT: { registered: false, value: "" },
    GTYGLIDERTYPE: { registered: false, value: "" },
    CIDCOMPETITIONID: { registered: false, value: "" },
    CCLCOMPETITION_CLASS: { registered: false, value: "" },
    TZNTIMEZONE: { registered: false, value: "" },
  });

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
    setFlightObject({
      FRID: { registered: false, value: "" },
      Sec: { registered: false, value: "" },
      flightData: [],
      DTE: { registered: false, value: "" },
      PLTPILOT: { registered: false, value: "" },
      GTYGLIDERTYPE: { registered: false, value: "" },
      CIDCOMPETITIONID: { registered: false, value: "" },
      CCLCOMPETITION_CLASS: { registered: false, value: "" },
      TZNTIMEZONE: { registered: false, value: "" },
    });
  };
  const updateData = () => {
    if (flightFile) {
      console.log(flightFile);
      setFlightData(flightFile.split("\n"));
    }
  };

  const updateObject = async () => {
    if (flightData) {
      await updateObjectData();
      checkFile();
    }
  };

  const updateObjectData = () => {
    console.log(flightData);
    if (typeof flightData === "object") {
      flightData.forEach((item, index) => {
        if (index === 0) {
          const FRID = { registered: true, value: item };
          flightObject.FRID = FRID;
        }
        switch (item.charAt(0)) {
          // popraw
          case "B": {
            flightObject.flightData.push(item.slice(1));
            let flightArr = flightObject.flightData.slice();
            flightArr.push(item.slice(1));
            setFlightObject({ ...flightObject, [flightData]: flightArr });
            break;
          }
          case "G": {
            const SEC = { registered: true, value: item.slice(1) };
            flightObject.Sec = SEC;
            break;
          }
          case "H": {
            let i = item.indexOf(":");
            let isSpaceI = item.indexOf(": ") === i ? 1 : 0;
            let characters = isSpaceI + 1;

            switch (item.slice(2, i)) {
              case "GTYGLIDERTYPE": {
                const GTYGLIDERTYPE = {
                  registered: true,
                  value: item.slice(i + characters),
                };
                flightObject.GTYGLIDERTYPE = GTYGLIDERTYPE;
                break;
              }
              case "CIDCOMPETITIONID": {
                const CIDCOMPETITIONID = {
                  registered: true,
                  value: item.slice(i + characters),
                };
                flightObject.CIDCOMPETITIONID = CIDCOMPETITIONID;
                break;
              }

              case "CCLCOMPETITION CLASS": {
                const CCLCOMPETITION_CLASS = {
                  registered: true,
                  value: item.slice(i + characters),
                };
                flightObject.CCLCOMPETITION_CLASS = CCLCOMPETITION_CLASS;
                break;
              }
              case "TZNTIMEZONE": {
                const TZNTIMEZONE = {
                  registered: true,
                  value: item.slice(i + characters),
                };
                flightObject.TZNTIMEZONE = TZNTIMEZONE;
                break;
              }
              default: {
                if (item.includes("DTE")) {
                  if (i !== -1) {
                    const DTE = {
                      registered: true,
                      value: item.slice(i + characters, i + characters + 6),
                    };
                    flightObject.DTE = DTE;
                    break;
                  }
                  const DTE = { registered: true, value: item.slice(5, 11) };
                  flightObject.DTE = DTE;
                  break;
                }
                if (item.includes("PLTPILOT")) {
                  const PLTPILOT = {
                    registered: true,
                    value: item.slice(i + characters),
                  };
                  flightObject.PLTPILOT = PLTPILOT;
                  break;
                }
              }
            }
          }
        }
      });
      console.log(flightObject);
    }
  };

  const checkFile = () => {
    try {
      if (flightObject.FRID.value.charAt(0) !== "A") {
        throw new Error("IGC file must contain an ID!");
      }
      if (!flightObject.Sec.registered) {
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
        targetObject: [flightObject, setFlightObject],
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
