//@@viewOn:imports
import {createComponent, createVisualComponent, useState} from "uu5g05";
import Config from "./config/config.js";
import {Button} from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import ListItemEditModal from "./list-item-edit-modal";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
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

const ListItemCheckbox = withControlledInput(Uu5Forms.Checkbox);
//@@viewOff:helpers

const ListItemDetail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListDetailItem",
  //@@viewOff:statics

  render(props) {
    //@@viewOn:private
    const [openEdit, setEditOpen] = useState(false);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <tr style={{"display": "flex", "width": "100%", "justifyContent": "center"}}>
        <td>
              <ListItemCheckbox
                {...props}
                itemList={[
                  {value: 0},
                  {value: 1, colorScheme: "positive", significance: "distinct", icon: "mdi-thumb-up"}
                ]}
                style={{"width": "calc(500vw / 10 - 5vw)"}}
                onChange={(e) => props.onChange(e)}
              />
        </td>
        <td style={{"display": "flex", "justifyContent": "flex-end"}}>
            <Button icon="uugds-pencil" onClick={() => setEditOpen(true)}/>
            <Button icon="uugds-delete" colorScheme="red" onClick={() => props.onDelete()}/>
        </td>

        <ListItemEditModal
          header={"Editing Item"}
          open={openEdit}
          onClose={() => setEditOpen(false)}
          listItemId={props.id}
          listItem={props.label}
          {...props}
        />
      </tr>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export {ListItemDetail};
export default ListItemDetail;
//@@viewOff:exports
