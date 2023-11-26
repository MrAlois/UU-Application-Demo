//@@viewOn:imports
import {Utils, createVisualComponent, PropTypes, useScreenSize, useSession} from "uu5g05";

import Config from "./config/config.js";
import {Header} from "uu5g05-elements";
import {Checkbox} from "uu5g05-forms";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  title: () =>
    Config.Css.css({
      margin: "2em",
      display: "flex",
      justifyContent: "center",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShoppingListHeader = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListHeader",
  //@@viewOff:statics

  render(props) {
    //@@viewOn:private
    const { text } = props
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Checkbox></Checkbox>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingListHeader };
export default ShoppingListHeader;
//@@viewOff:exports
