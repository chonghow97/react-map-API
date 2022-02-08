import Map from "../containers/Map";

import { DEFAULT_API_KEY, DEFAULT_CENTER } from "../config/constant";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

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
