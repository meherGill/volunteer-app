import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const latLong = {
  lng: 151.04661363979582,
  lat: -33.715751380693824,
};

const markers = [];

const GCP_API_KEY = "AIzaSyBFvNDoVEJqDkF_pMJOBBMl97FLhpSJJ6A";

interface IGMapsProps {
  width: string;
  height: string;
}
const GMaps = (props: IGMapsProps) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GCP_API_KEY,
  });

  const [forceRender, setForceRender] = useState(-1);
  const [map, setMap] = useState(null);

  const containerStyle = {
    width: props.width,
    height: props.height,
    zIndex: 0,
  };

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={latLong}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* {console.log(latLong)} */}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default GMaps;
