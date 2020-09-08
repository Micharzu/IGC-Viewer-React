import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";

const mapStyles = {
  position: "relative",
  width: "100%",
  height: "100%",
};

const MapContainer = (props) => {
  const [positions, setPositions] = useState({});
  const [pathArr, setPathArr] = useState([]);

  //when provided data changes update maps dataset
  useEffect(() => {
    const firstFlightRecord = props.flightData[0];
    const lastFlightRecord = props.flightData[props.flightData.length - 1];

    let newStartPosition = calculatePosition(firstFlightRecord);
    let newFinnishPosition = calculatePosition(lastFlightRecord);

    setPositions({
      startPositionDD: newStartPosition,
      finnishPositionDD: newFinnishPosition,

      mapPositionDD: {
        lat: (newStartPosition.lat + newFinnishPosition.lat) / 2,
        lng: (newStartPosition.lng + newFinnishPosition.lng) / 2,
      },
    });

    let newPathArr = props.flightData.map((rec) => calculatePosition(rec));

    setPathArr(newPathArr);
  }, [props.flightData]);

  const calculateDecMinToDecDeg = (degBitNumber, coords) => {
    let decMinStr =
      coords.slice(degBitNumber, degBitNumber + 2) +
      "." +
      coords.slice(degBitNumber + 2, degBitNumber + 5);
    if (decMinStr[0] === "0") {
      decMinStr = decMinStr.slice(1);
    }
    let sign = 1;

    if (
      coords.slice(degBitNumber + 5) === "S" ||
      coords.slice(degBitNumber + 5) === "W"
    ) {
      sign = -1;
    }

    let decDegFloat = parseFloat(decMinStr) / 60;
    let degFloat = parseFloat(coords.slice(0, degBitNumber));
    let positionInDecDeg = Number((degFloat + decDegFloat).toFixed(6)) * sign;

    return positionInDecDeg;
  };

  //format record to an object accepted by google-maps-react map
  const calculatePosition = (record) => {
    let recordObj = {
      lat: calculateDecMinToDecDeg(2, record.slice(6, 14)),
      lng: calculateDecMinToDecDeg(3, record.slice(14, 23)),
    };

    return recordObj;
  };

  if (positions.mapPositionDD) {
    return (
      <div className="mapInner">
        <Map
          google={props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={positions.mapPositionDD}
          center={positions.mapPositionDD}
        >
          <Marker
            label={{
              text: "Początek",
              fontSize: "16px",
              fontWeight: "700",
              color: "rgb(30, 30, 30)",
            }}
            position={positions.startPositionDD}
          />
          <Marker
            label={{
              text: "Koniec",
              fontSize: "16px",
              fontWeight: "700",
              color: "rgb(30, 30, 30)",
            }}
            position={positions.finnishPositionDD}
          />
          <Polyline
            path={pathArr}
            geodesic={true}
            options={{
              strokeColor: "rgba(230, 65, 47, 0.9)",
              strokeOpacity: 0.75,
              strokeWeight: 3,
            }}
          />
        </Map>
      </div>
    );
  }

  return (
    <div>
      <h3>Ładowanie...</h3>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDrqc5R65cKDZMVxzoN172YnlLCGKiHNM4",
})(MapContainer);
