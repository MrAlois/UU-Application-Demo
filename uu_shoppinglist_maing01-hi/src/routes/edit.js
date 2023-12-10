//@@viewOn:imports
import {
  createVisualComponent, useRoute, useState,
} from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Uu5Elements, {Button} from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";

import Config from "./config/config.js";
import ShoppingListHeader from "../bricks/shopping-header";
import ListEditModal from "../bricks/list-edit-modal";
import ListEditForm from "../bricks/list-edit-form";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  content: () =>
    Config.Css.css({
      backgroundColor: "black",
      margin: "100rem"
    }),
  formBody: () =>
    Config.Css.css({
      display: "grid",
      rowGap: 8,
      columnGap: 32,
      margin: "0 15% 0 15%"
    })
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Edit = createVisualComponent({
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
    const {listId, listName, ownerId = "1", memberId = [""], users = [
      { value: "1", children: "Alois Šenkyřík" },
      { value: "2", children: "Linda Knížková" },
    ], description = ""} = props

    const [route, setRoute] = useRoute();
    const [modalOpen, setModalOpen] = useState(false);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <div>
        {/*<ShoppingListHeader text={"Editing shopping list - " + listName}></ShoppingListHeader>*/}
        <Uu5Forms.Form
          onSubmit={(e) => {
            alert("Submitted with values:\n" + JSON.stringify(e.data.value, null, 2));
          }}
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
          <ListEditForm></ListEditForm>

          <Button onClick={(event) => setRoute("home")} style={Css.content()} significance="subdued">Back</Button>
          <Uu5Forms.SubmitButton style={Css.content()}>Edit</Uu5Forms.SubmitButton>
        </Uu5Forms.Form>

        <Uu5Elements.Button onClick={() => setModalOpen(true)}>Edit něco</Uu5Elements.Button>
        <ListEditModal open={modalOpen} onClose={() => setModalOpen(false)}></ListEditModal>
      </div>
    );
    //@@viewOff:render
  }
});

Edit = withRoute(Edit);

//@@viewOn:exports
export { Edit };
export default Edit;
//@@viewOff:exports
