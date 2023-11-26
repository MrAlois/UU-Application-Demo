//@@viewOn:imports
import {
  createVisualComponent, useRoute, useState,
} from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Uu5Elements, {Block, Button} from "uu5g05-elements";
import Uu5Forms, {Checkbox, TextSelect} from "uu5g05-forms";

import Config from "./config/config.js";
import ShoppingListHeader from "../bricks/shopping-header";
import UU5 from "uu5g04";
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
function withControlledInput(Input) {
  return (props) => {
    const {
      value: propsValue,
      onChange,
      onValidationStart,
      onValidationEnd,
      feedback,
      message,
      messageParams,
    } = props;

    const [value, setValue] = useState(propsValue);
    const [errorList, setErrorList] = useState(null);
    const [pending, setPending] = useState();

    return (
      <div>
        <Input
          {...props}
          value={value}
          feedback={errorList?.[0].feedback || feedback}
          message={errorList?.[0].message || message}
          messageParams={errorList?.[0].messageParams || messageParams}
          pending={pending}
          onChange={(e) => {
            typeof onChange === "function" && onChange(e);
            setValue(e.data.value);
          }}
          onValidationStart={(e) => {
            typeof onValidationStart === "function" && onValidationStart(e);
            setPending(true);
          }}
          onValidationEnd={(e) => {
            typeof onValidationEnd === "function" && onValidationEnd(e);
            setErrorList(e.data.errorList.length ? e.data.errorList : null);
            setPending(false);
          }}
        />
      </div>
    );
  };
}


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

  render() {
    //@@viewOn:private
    const [route, setRoute] = useRoute()
    const TextSelect = withControlledInput(Uu5Forms.TextSelect);
    const Checkbox = withControlledInput(Uu5Forms.Checkbox);

    //@@viewOff:private

    //@@viewOn:render
    return (
      <div>
        <ShoppingListHeader text={"Creating a new shopping list"}></ShoppingListHeader>
        <Uu5Forms.Form
          onSubmit={(e) => {
            alert("Submitted with values:\n" + JSON.stringify(e.data.value, null, 2));
          }}
        >
          <Uu5Elements.Block info="Buy a Red Monster T-shirt in a limited edition and win one of interesting presents.">
            <div className={Css.formBody()}>
              <div>
                <Uu5Forms.FormText name="name" label="List name" required message="Item count is limited by current stock reserve." r/>
              </div>

              <div className={Config.Css.css({ display: "grid", rowGap: 8 })}>
                <TextSelect
                  name="additionalUserId"
                  label="Additional editors"
                  itemList={[
                    { value: "12345", children: "Alois Šenkyřík" },
                    { value: "54321", children: "Linda Knížková" },
                  ]}
                  value={["12345", "54321"]}
                  multiple
                />
              </div>
              <div>
                <Uu5Forms.FormTextArea name="desc" label="Description" />
              </div>
              <div>
                <Block style="display: flex;">
                  <Checkbox
                    name="checkbox1"
                    label="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
                    value={0}
                    itemList={[
                      { value: 0 },
                      { value: 1, colorScheme: "positive", significance: "distinct", icon: "mdi-thumb-up" }
                    ]}
                  />
                  <Button icon="uugds-pencil"/>
                  <Button icon="uugds-delete"/>
                </Block>

              </div>
              <div>
                <Button onClick={() => setRoute("home")} style={Css.content()} significance="subdued">Back</Button>
                <Uu5Forms.SubmitButton style={Css.content()}>Create list</Uu5Forms.SubmitButton>
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
