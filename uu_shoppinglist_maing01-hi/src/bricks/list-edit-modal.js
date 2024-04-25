//@@viewOn:imports
import {createVisualComponent} from "uu5g05";
import Uu5Elements, {Text} from "uu5g05-elements";
import { Config } from "uu5g05-dev";

import Uu5Forms from "uu5g05-forms";
//@@viewOff:imports

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

const ListEditModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Edit",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    listId: "string",
    listName: "string",
    owner: { id: "string", name: "string" },
    members: [{ id: "string", name: "string" }],
    description: "string",
    creating: "boolean",
    archived: "boolean"
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    listName: "Undefined list",
    owner: global.CURRENT_USER,
    members: [],
    description: "",
    archived: false,
    creating: true,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const availableUsers = global.ALL_USERS.map(user => ({
      value: user.id,
      children: user.name,
    }));
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Uu5Forms.Form.Provider
        onSubmit={(e) => {
          if (!navigator.onLine) throw new Error("Demo submit error example.");
          props.onSubmit(e.data.value)
          props.onClose();
        }}
      >
        <Uu5Elements.Modal
          header="Edit/Create a list"
          {...props}

          footer={
            <Uu5Elements.Grid
              templateColumns={{ xs: "repeat(2, 1fr)", s: "repeat(2, auto)" }}
              justifyContent={{ s: "end" }}
            >
              <Uu5Forms.CancelButton onClick={props.onClose} />
              <Uu5Forms.SubmitButton>Submit</Uu5Forms.SubmitButton>
            </Uu5Elements.Grid>
          }
        >
          <Uu5Forms.Form.View>
            <Uu5Elements.Block
              {...props}
              info="Edit or create a new list"
              header={
                props.creating
                  ? <Text category="story" segment="heading" type="h2">Create new list</Text>
                  : <Text category="story" segment="heading" type="h2">Editing "{props.listName}"</Text>
              }
            >
              <div className={Css.formBody()}>
                <div>
                  <Uu5Forms.FormText initialValue={props.listName} placeholder={props.listName} name="listName" label="List name" required/>
                </div>

                <div className={Config.Css.css({display: "grid", rowGap: 8})}>
                  <Uu5Forms.FormSelect
                    name="ownerId"
                    label="Owner"
                    initialValue={props.owner?.id}
                    itemList={availableUsers}
                    disabled={props.creating || props.owner?.id !== global.CURRENT_USER.id}
                    required={true}
                  />
                </div>

                <div className={Config.Css.css({display: "grid", rowGap: 8})}>
                  <Uu5Forms.FormTextSelect
                    name="memberIds"
                    label="Additional editors"
                    itemList={availableUsers}
                    initialValue={props.members.map(member =>  member.id)}
                    multiple={true}
                  />
                </div>

                <div>
                  <Uu5Forms.FormTextArea name="description" initialValue={props.description} label="Description"/>
                </div>
              </div>
            </Uu5Elements.Block>
          </Uu5Forms.Form.View>
        </Uu5Elements.Modal>
      </Uu5Forms.Form.Provider>
    );
    //@@viewOff:render
  }
});

//@@viewOn:exports
export { ListEditModal };
export default ListEditModal;
//@@viewOff:exports
