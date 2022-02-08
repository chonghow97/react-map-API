import { inputStyle } from "./style";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const SearchBar: React.FC<Props> = (props) => {
  const { style, ...restProps } = props;
  return (
    <input
      type="text"
      placeholder="Customized your placeholder"
      style={inputStyle}
      {...restProps}
    />
  );
};

export default SearchBar;
