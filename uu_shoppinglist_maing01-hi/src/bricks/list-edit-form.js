//@@viewOn:imports
import {
  createVisualComponent, useRoute, useState,
} from "uu5g05";
import Uu5Elements, {Button, Text} from "uu5g05-elements";
import Uu5Forms, {TextSelect} from "uu5g05-forms";

import Config from "./config/config.js";
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

let ListEditForm = createVisualComponent({
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
    const {
      listId,
      listName = "<undefined>",
      ownerId = "1",
      members = [""],
      allUsers = [""],
      description = "",
      creating = false
    } = props

    const users = allUsers.map(user => ({
      value: user.id,
      children: user.name,
    }));

    const TextSelect = withControlledInput(Uu5Forms.TextSelect);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Uu5Forms.Form.View>
        <Uu5Elements.Block
          {...props}
          info="Edit or create a new list"
          header={
            creating ? <Text category="story" segment="heading" type="h2">Create new list</Text>
              : <Text category="story" segment="heading" type="h2">Editing "{listName}"</Text>
          }
        >
          <div className={Css.formBody()}>
            <div>
              <Uu5Forms.FormText initialValue={listName} placeholder={listName} name="listName" label="List name" required/>
            </div>

            <div className={Config.Css.css({display: "grid", rowGap: 8})}>
              <Uu5Forms.FormSelect
                name="ownerId"
                label="Owner"
                initialValue={ownerId}
                itemList={users}
                disabled={creating}
              />
            </div>

            <div className={Config.Css.css({display: "grid", rowGap: 8})}>
              <Uu5Forms.FormTextSelect
                name="memberIds"
                label="Additional editors"
                itemList={users}
                initialValue={members.map(member =>  member.id)}
                multiple={true}
              />
            </div>

            <div>
              <Uu5Forms.FormTextArea name="description" initialValue={description} label="Description"/>
            </div>
          </div>
        </Uu5Elements.Block>
      </Uu5Forms.Form.View>
    );
    //@@viewOff:render
  }
});

//@@viewOn:exports
export {ListEditForm};
export default ListEditForm;
//@@viewOff:exports
