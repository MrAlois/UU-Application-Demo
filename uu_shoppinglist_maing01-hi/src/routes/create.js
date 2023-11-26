//@@viewOn:imports
import {
  createVisualComponent,
} from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Uu5Elements, {Button} from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";

import Config from "./config/config.js";
import ShoppingListHeader from "../bricks/shopping-header";
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
      // gridAutoFlow: "column",
      // gridTemplateRows: "repeat(4, auto)",
      // gridTemplateColumns: "1fr 1fr",
    })
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Create = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Create",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const {listName} = props
    //@@viewOff:private

    //@@viewOn:render
    return (
      <div>
        <ShoppingListHeader text={"Creating shopping list - " + listName}></ShoppingListHeader>
        <Uu5Forms.Form
          onSubmit={(e) => {
            alert("Submitted with values:\n" + JSON.stringify(e.data.value, null, 2));
          }}
          onSubmitted={(e) => {
            const { submitResult, form } = e.data;
            if (confirm("Do you want to reset the form and buy another one? Buyer information will be preserved.")) {
              form.reset({
                name: form.value.name,
                phone: form.value.phone,
                email: form.value.email,
              });
            }
          }}
        >
          <Uu5Elements.Block info="Buy a Red Monster T-shirt in a limited edition and win one of interesting presents.">
            <div className={Css.formBody()}>
              <div>
                <Uu5Forms.FormText name="listName" label="List name" required message="Item count is limited by current stock reserve." r/>
              </div>

              <div className={Config.Css.css({ display: "grid", rowGap: 8 })}>
                <Uu5Forms.FormSelect
                  name="ownerNAme"
                  label="Owner"
                  initialValue="1"
                  itemList={[
                    { value: "1", children: "Alois Šenkyřík" },
                    { value: "2", children: "Linda Knížková" },
                  ]}
                />
              </div>
              <div>
                <Uu5Forms.FormTextArea name="desc" label="Description" />
              </div>
              <div>
                <Button href="/home" style={Css.content()} significance="subdued">Back</Button>
                <Uu5Forms.SubmitButton style={Css.content()}>Edit</Uu5Forms.SubmitButton>
              </div>
            </div>
          </Uu5Elements.Block>
        </Uu5Forms.Form>
      </div>
    );
    //@@viewOff:render
  }
});

Create = withRoute(Create);

//@@viewOn:exports
export { Create };
export default Create;
//@@viewOff:exports
