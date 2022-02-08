import Map from "../../containers/Map";

import { containerStyle } from "./style";

export const HomeScreen: React.FC = () => {
  return <Map mapContainerStyle={containerStyle} zoom={12} />;
};

export default HomeScreen;
