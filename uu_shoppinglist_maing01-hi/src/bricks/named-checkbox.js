//@@viewOn:imports
import {  useState, createComponent } from "uu5g05";

import Config from "./config/config.js";
import Uu5Forms from "uu5g05-forms";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  checkbox: () =>
    Config.Css.css({
      margin: "0.5rem",
      alignSelf: "flex-end"
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const NamedCheckbox = createComponent({
  render(props) {
    const { icon, text, value: propValue = false, colorScheme, onClick, significance } = props;
    const [value, setValue] = useState(propValue);

    return (
      <label className={Css.checkbox()}>
        {text} &nbsp;
        <Uu5Forms.Checkbox.Input
          {...props}
          colorScheme={colorScheme || (value ? "primary" : undefined)}
          significance={significance === "highlighted" && value ? significance : "common"}
          icon={value ? icon : undefined}
          onClick={(e) => {
            typeof onClick === "function" && onClick(e);
            setValue((v) => !v);
          }}
        />
      </label>
    );
  },
});

//@@viewOn:exports
export { NamedCheckbox };
export default NamedCheckbox;
//@@viewOff:exports
