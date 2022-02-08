import React, { useState } from "react";

import {
  DEFAULT_API_KEY,
  DEFAULT_CENTER,
  DEFAULT_LOGO,
} from "../../config/constant";
import { AutocompleteType, CoordinateType } from "../../@types";

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

const Map: React.FC<GoogleMapProps> = (props) => {
  // ============== STATE & VARIABLE
  const { children, ...restProps } = props;
  const [autocomplete, setAutoComplete] = useState<AutocompleteType | null>(
    null
  );
  const [isShow, setIsShown] = useState(false);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [position, setPosition] = useState<CoordinateType>(DEFAULT_CENTER);

  // ==============  FUNCTION
  const onCloseClick = () => {
    setIsShown(false);
  };

  const onLoad: (autocomplete: AutocompleteType) => void = (autocomplete) => {
    setAutoComplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const { geometry, name } = autocomplete.getPlace() || {};
      setTitle(name);
      const { location } = geometry || {};
      setPosition(location);
    } else {
      console.error("unable to load cause autocomplete is null");
    }
  };

  const onClickMarker: (curr: CoordinateType) => void = (curr) => {
    setPosition(curr);
    setIsShown(true);
  };

  // ==============  RENDER
  return (
    <LoadScript googleMapsApiKey={DEFAULT_API_KEY} libraries={["places"]}>
      {/* Map */}
      <GoogleMap center={position} {...restProps}>
        {/* Auto Complete */}
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          {/* Search Bar */}
          <SearchBar />
        </Autocomplete>

        {/* Marker */}
        <Marker
          position={position || DEFAULT_CENTER}
          icon={DEFAULT_LOGO}
          onClick={() => onClickMarker(position)}
        />

        {/* Map Info */}
        {isShow && (
          <InfoLayout
            onCloseClick={onCloseClick}
            position={position}
            children={<MapInfoContainer title={title} />}
          />
        )}
        {children}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
