import Map from "../../containers/Map";

import { DEFAULT_CENTER } from "../../config/constant";
import { containerStyle } from "./style";

export const HomeScreen: React.FC = () => {
  return (
    <Map mapContainerStyle={containerStyle} center={DEFAULT_CENTER} zoom={12} />
  );
};

export default HomeScreen;
