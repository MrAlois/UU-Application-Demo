//@@viewOn:imports
import {createVisualComponent} from "uu5g05";

import Config from "./config/config.js";
import {Button} from "uu5g05-elements";
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

const ListDetailItem = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListDetailItem",
  //@@viewOff:statics

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    return (
      <tr>
        <td>
          <Checkbox
            {...props}
            itemList={[
              {value: 0},
              {value: 1, colorScheme: "positive", significance: "distinct", icon: "mdi-thumb-up"}
            ]}
          />
        </td>
        <td style={{"display": "inline", "paddingLeft": "1em"}}>
            <Button icon="uugds-pencil" onClick={() => alert("Editing task: "+ id)}/>
            <Button icon="uugds-delete" colorScheme="red" onClick={() => props.onDelete()}/>
        </td>
      </tr>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export {ListDetailItem};
export default ListDetailItem;
//@@viewOff:exports
