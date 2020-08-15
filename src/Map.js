import React, { useState, useEffect } from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

const Map = () => {
  return (
    <div className="map">
      <GoogleMap defaultZoom={5} defaultCenter={{ lat: 52.5, lng: 20 }} />
    </div>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
