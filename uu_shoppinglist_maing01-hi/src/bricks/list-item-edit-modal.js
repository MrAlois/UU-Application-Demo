//@@viewOn:imports
import {createVisualComponent} from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import { Config } from "uu5g05-dev";

import Uu5Forms from "uu5g05-forms";
//@@viewOff:imports

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ListItemEditModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Edit",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Uu5Forms.Form.Provider
        onSubmit={(e) => {
          if (!navigator.onLine) throw new Error("Demo submit error example.");
          props.onItemUpdate(props.name, e.data.value.listItem)
          props.onClose();
        }}
      >
        <Uu5Elements.Modal
          header="Edit list item"
          {...props}

          footer={
            <Uu5Elements.Grid
              templateColumns={{ xs: "repeat(2, 1fr)", s: "repeat(2, auto)" }}
              // columnGap={Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"])}
              justifyContent={{ s: "end" }}
            >
              <Uu5Forms.CancelButton onClick={props.onClose} />
              <Uu5Forms.SubmitButton>Submit</Uu5Forms.SubmitButton>
            </Uu5Elements.Grid>
          }
        >
          <Uu5Forms.Form.View>
            <Uu5Forms.FormText initialValue={props.listItem} name="listItem" label="Item Name" required/>
          </Uu5Forms.Form.View>
        </Uu5Elements.Modal>
      </Uu5Forms.Form.Provider>
    );
    //@@viewOff:render
  }
});

//@@viewOn:exports
export { ListItemEditModal };
export default ListItemEditModal;
//@@viewOff:exports
