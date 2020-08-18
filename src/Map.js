import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";

const mapStyles = {
  position: "relative",
  width: "45%",
  height: "50%",
};

const MapContainer = (props) => {
  const [positions, setPositions] = useState({});
  const [pathArr, setPathArr] = useState([]);

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

  const calculatePosition = (record) => {
    let recordObj = {
      lat: calculateDecMinToDecDeg(2, record.slice(6, 14)),
      lng: calculateDecMinToDecDeg(3, record.slice(14, 23)),
    };

    return recordObj;
  };

  if (positions.mapPositionDD) {
    return (
      <div className="map">
        <Map
          google={props.google}
          zoom={7}
          style={mapStyles}
          initialCenter={positions.mapPositionDD}
          center={positions.mapPositionDD}
        >
          <Marker label="Początek" position={positions.startPositionDD} />
          <Marker label="Koniec" position={positions.finnishPositionDD} />
          <Polyline
            path={pathArr}
            geodesic={true}
            options={{
              strokeColor: "#ff2527",
              strokeOpacity: 0.75,
              strokeWeight: 2,
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
