import { useState } from "react";
import Map from "../../containers/Map";

import { containerStyle } from "./style";

import { MapContext } from "../../context";
import { PlaceResult } from "../../@types";

export const HomeScreen: React.FC = () => {
  const [mapLists, setMapLists] = useState<PlaceResult[]>([]);

  return (
    <MapContext.Provider value={{ mapLists, setMapLists }}>
      <main className="flex">
        <div className="flex-1 p-3 min-w-[300px] hidden md:block">
          <h1>Map History</h1>
          {mapLists.map((mapList) => {
            return (
              <section key={mapList.place_id}>
                {mapList.formatted_address}
              </section>
            );
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
