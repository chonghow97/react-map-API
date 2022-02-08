import { InfoWindow as GoogleInfoWindow } from "@react-google-maps/api";
import Props from "./types";

export const InfoLayout: React.FC<Props> = (props) => {
  const { position, onCloseClick, children } = props;

  return (
    <GoogleInfoWindow position={position} onCloseClick={onCloseClick}>
      {children}
    </GoogleInfoWindow>
  );
};

export type InfoLayoutProps = Props;

export default InfoLayout;
