import { useState } from "react";
import Map from "../../containers/Map";

import { containerStyle } from "./style";

import { MapContext } from "../../context";
import { PlaceResult } from "../../@types";
import React from "react";

export const HomeScreen: React.FC = () => {
  const [mapLists, setMapLists] = useState<Array<PlaceResult>>([]);

  return (
    <MapContext.Provider value={{ mapLists, setMapLists }}>
      <main className="flex">
        <div className="flex-1 p-3 min-w-[300px] hidden md:block">
          <h1>Map List</h1>
          {mapLists.map((mapList) => {
            return <h1>{mapList.formatted_address}</h1>;
          })}
        </div>

        <div>
          <Map mapContainerStyle={containerStyle} zoom={12} />
        </div>
      </main>
    </MapContext.Provider>
  );
};

export default HomeScreen;
