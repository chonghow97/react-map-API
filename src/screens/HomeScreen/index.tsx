import Map from "../../containers/Map";

import { DEFAULT_API_KEY, DEFAULT_CENTER } from "../../config/constant";
import { containerStyle } from "./style";

export const HomeScreen: React.FC = () => {
  return (
    <Map
      googleMapsApiKey={DEFAULT_API_KEY}
      mapContainerStyle={containerStyle}
      center={DEFAULT_CENTER}
      zoom={12}
    />
  );
};

export default HomeScreen;
