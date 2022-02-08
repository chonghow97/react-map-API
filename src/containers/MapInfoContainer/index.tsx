import { Props } from "./props";
import { Container } from "./style";

export const MapInfoContainer: React.FC<Props> = (props) => {
  const { title } = props;

  return (
    <Container>
      <h1>{title ?? "InfoWindow"}</h1>
    </Container>
  );
};

export default MapInfoContainer;
