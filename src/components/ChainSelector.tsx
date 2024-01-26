import Select from "react-select";
import { chainsList } from "../data/chains";

type Props = {
    onSelect: (value?: string|undefined) => void
  }

function ChainSelector(props: Props) {
  return (
    <Select
      inputId="fromChainSelect"
      id="fromChain"
      onChange={(e) => props.onSelect(e?.value)}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          //   borderColor: state.isFocused ? "grey" : "red",
          border: "unset",
          borderColor: "unset",
          background: "unset",
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          color: state.isSelected ? "#FFF" : "#fff9",
          background: state.isFocused ? "#1e3a8a" : "#0b213f",
          cursor: "pointer",
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: "#fff9",
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          background: "#0b213f",
        }),
      }}
      options={chainsList}
      formatOptionLabel={country => (
        <div className="flex items-center gap-2">
          <img style={{width: '25px', aspectRatio: 1}} src={country.logo} alt="country-image" />
          <span>{country.label}</span>
        </div>
      )}
    />
  );
}

export default ChainSelector;
