import React, { useContext } from "react";

import { DEFAULT_API_KEY, DEFAULT_LOGO } from "../../config/constant";

import {
  GoogleMap,
  LoadScript,
  GoogleMapProps,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";

import { MapInfoContainer } from "../MapInfoContainer";

import { InfoLayout, SearchBar } from "../../components";
import { useMapHook } from "../../hooks/useMapHook";
import { MapContext } from "../../context";
import { Libraries } from "../../@types";

const libraries: Libraries = ["places"];

const Map: React.FC<GoogleMapProps> = (props) => {
  // ============== STATE & VARIABLE
  const { children, ...restProps } = props;

  // ============== HOOKS
  const { setMapLists } = useContext(MapContext);

  const {
    onCloseClick,
    onLoad,
    onPlaceChanged,
    onClickMarker,
    isOpenMapInfo,
    title,
    position,
  } = useMapHook(setMapLists);

  // ==============  RENDER
  return (
    <LoadScript googleMapsApiKey={DEFAULT_API_KEY} libraries={libraries}>
      {/* Map */}
      <GoogleMap center={position} {...restProps}>
        {/* Auto Complete */}
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          {/* Search Bar */}
          <SearchBar />
        </Autocomplete>

        {/* Marker */}
        <Marker
          position={position}
          icon={DEFAULT_LOGO}
          onClick={() => onClickMarker(position)}
        />

        {/* Map Info */}
        {isOpenMapInfo && (
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
