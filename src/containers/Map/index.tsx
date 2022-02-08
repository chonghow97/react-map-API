import React, { useState } from "react";

import { DEFAULT_CENTER, DEFAULT_LOGO } from "../../config/constant";
import { CoordinateType } from "../../@types";

import {
  GoogleMap,
  LoadScript,
  GoogleMapProps,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";

import { MapInfoContainer } from "../MapInfoContainer";

import InfoLayout from "../../components/InfoWindow";
import SearchBar from "../../components/SearchBar";

type Props = GoogleMapProps & {
  googleMapsApiKey: string;
};

const Map: React.FC<Props> = (props) => {
  // ============== STATE & VARIABLE
  const { googleMapsApiKey, children, ...restProps } = props;
  // TODO: need a proper props
  const [autocomplete, setAutoComplete] = useState<any>(null);

  const [position, setPosition] = useState<CoordinateType>(undefined);

  const onCloseClick = () => {
    setPosition(undefined);
  };

  // ==============  FUNCTION

  const onLoad: (autocomplete: google.maps.places.Autocomplete) => void = (
    autocomplete
  ) => {
    console.log("autocomplete: ", autocomplete);
    setAutoComplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      console.log(autocomplete.getPlace());
    } else {
      console.log("fatch first");
    }
  };

  const onClickMarker: (coor: CoordinateType) => void = (coor) => {
    setPosition(coor);
  };

  // ==============  RENDER
  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={["places"]}>
      {/* Map */}
      <GoogleMap {...restProps}>
        {/* Auto Complete */}
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          {/* Search Bar */}
          <SearchBar />
        </Autocomplete>

        {/* Marker */}
        <Marker
          position={DEFAULT_CENTER}
          icon={DEFAULT_LOGO}
          onClick={() => onClickMarker(DEFAULT_CENTER)}
        />

        {/* Map Info */}
        {position && (
          <InfoLayout
            {...{ onCloseClick, position }}
            children={<MapInfoContainer />}
          />
        )}
        {children}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
