//@@viewOn:imports
import {Content, createVisualComponent, useRoute, useState} from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import {Block, Button, Text} from "uu5g05-elements";
import ListItemDetail from "../bricks/list-item-detail";
import Uu5Elements from "uu5g05-elements";
import ListEditModal from "../bricks/list-edit-modal";
import React from "react";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  content: () =>
    Config.Css.css({
      padding: '2rem',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60%',
    })
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ListMenu = createVisualComponent({
  render(props) {
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setEditOpen] = useState(false);
    const [openArchive, setArchiveOpen] = useState(false);

    return (
      <Content>
        <Block>
          <Uu5Elements.Button icon="uugds-pencil" onClick={() => {
            setEditOpen(true);
          }} {...props}>
            Edit
          </Uu5Elements.Button>
          <Uu5Elements.Button icon="uugds-shield" onClick={() => setArchiveOpen(true)} {...props}/>
          <Uu5Elements.Button icon="uugds-delete" colorScheme="red" onClick={() => setOpenDelete(true)} {...props}/>
        </Block>

        <Uu5Elements.Dialog
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          header="Delete this list?"
          icon={<Uu5Elements.Svg code="uugdssvg-svg-delete" />}
          info="List data cannot be recovered!"
          actionDirection="horizontal"
          actionList={[
            {
              children: "Cancel",
              onClick: () => console.log("Cancel"),
            },
            {
              children: "Delete",
              onClick: () => props.deleteList(props.listId),
              colorScheme: "red",
              significance: "highlighted",
            },
          ]}
        />

        <Uu5Elements.Dialog
          open={openArchive}
          onClose={() => setArchiveOpen(false)}
          header="Archive this list?"
          icon={<Uu5Elements.Svg code="uugdssvg-svg-security" />}
          actionDirection="horizontal"
          actionList={[
            {
              children: "Cancel",
              onClick: () => console.log("Cancel"),
            },
            {
              children: "Archive",
              onClick: () => props.updateList(props.listId, { archived: true}),
              colorScheme: "red",
              significance: "highlighted",
            },
          ]}
        />

        <ListEditModal
          header={"Editing list"}
          open={openEdit}
          onClose={() => setEditOpen(false)}
          listName={props.listName}
          ownerId={props.owner?.id}
          {...props}
        />
      </Content>
    );
  },
});

let Detail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Detail",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    listName: "string",
    ownerId: "string",
    lastUpdated: "string",
    description: "string"
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    listId: "Unknown list",
    ownerId: "1",
    lastUpdated: "10/12/2023",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Ex sapien vitae pellentesque sem placerat in id. Pretium tellus duis convallis tempus leo eu aenean. Urna tempor pulvinar vivamus fringilla lacus nec metus. Iaculis massa nisl malesuada lacinia integer nunc posuere. Semper vel class aptent taciti sociosqu ad litora. Conubia nostra inceptos himenaeos orci varius natoque penatibus. Dis parturient montes nascetur ridiculus mus donec rhoncus. Nulla molestie mattis scelerisque maximus eget fermentum odio. Purus est efficitur laoreet mauris pharetra vestibulum fusce."
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [, setRoute] = useRoute()

    const listDetailData = global.ALL_LISTS.find((list) => list.listId === props.params.id);
    alert(JSON.stringify(listDetailData))

    //TODO ListID and select from globals.
    const [listName, setListName] = useState(listDetailData.listName)
    const [ownerId, setOwnerIdId] = useState(listDetailData.ownerId)
    const [lastUpdated, setLastUpdated] = useState(listDetailData.lastUpdated);
    const [description, setDescription] = useState(listDetailData.description);
    const [memberList, setMemberList] = useState(listDetailData.members)

    const [newItemName, setNewItemName] = useState("");

    const [items, setItems] = useState([
      {id: "1", description: "Eggs", state: 0},
      {id: "2", description: "Milk", state: 0},
      {id: "3", description: "Bread", state: 0},
      {id: "4", description: "Butter", state: 0},
      {id: "5", description: "Potato", state: 0},
      {id: "6", description: "Onion", state: 0},
      {id: "7", description: "Carrot", state: 0}
    ]);

    const detailData = {
      listName: listName,
      ownerId: ownerId, //TODO Prostě přepiš na najitý list
      dateCreated: new Date("10/12/2023").toLocaleDateString(),
      dateUpdate: lastUpdated,
      description: description,
      members: memberList,
      items: items
    };

    const updateData = (formData) => {
      // If the new owner was in the member list, remove them
      const updatedMembers = updateMembersBasedOnFormData(global.ALL_USERS, formData);

      // If the current owner is not the new owner, add them to the member list
      const updatedOwnerId = updateOwnerIdBasedOnFormData(global.ALL_USERS, formData, updatedMembers);

      setListName(formData.listName)
      setOwnerIdId(formData.ownerId)
      setDescription(formData.description)
      setMemberList(updatedOwnerId)
      setLastUpdated(Date.now())
    };

    const updateMembersBasedOnFormData = (allUsers, formData) => {
      return allUsers.filter(
        (member) => member.id !== formData.ownerId && formData.memberIds.includes(member.id)
      );
    };

    const updateOwnerIdBasedOnFormData = (allUsers, formData, updatedMembers) => {
      return formData.ownerId !== ownerId
        ? [...updatedMembers, allUsers.find((user) => user.id === ownerId)]
        : updatedMembers;
    };

    const updateItemName = (itemId, newItemName) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, description: newItemName } : item
        )
      );
    };

    /**
     * Calculates and returns a summary of the number of items in the given array.
     *
     * @param {Array} items - An array of items.
     * @returns {String} - A summary indicating the number of items that are in state 1 and the total number of items.
     */
    const createNumberSummary = (items) => {
      const doneCount = items.filter((item) => item.state === 1).length
      return doneCount + " / " + items.length ;
    }

    /**
     * Toggles the state of an item in the items array based on the given id.
     *
     * @param {number} id - The id of the item to toggle.
     * @returns {undefined}
     */
    const toggleItemState = (id) => {
      setItems((prevItems) =>
        prevItems.map((item) => item.id === id ? { ...item, state: item.state === 0 ? 1 : 0 } : item)
      );
    };

    const itemList = [
      {
        imageSrc: "https://cdn.plus4u.net/uu-plus4u5g01/4.0.0/assets/img/anonymous.png",
        subtitle: "Owner",
        title: global.ALL_USERS.find(user => user.id === ownerId)?.name,
      },
      { subtitle: "Date of creation", title: detailData.dateCreated },
      { subtitle: "Last updated", title: new Date(lastUpdated).toLocaleDateString()},
      { subtitle: "Completed tasks", title: createNumberSummary(detailData.items) },
      { subtitle: "Members", title: detailData.members.map(item => item.name).join(", ")},
      { component: <ListMenu onSubmit={(data) => updateData(data)} {...detailData}></ListMenu> }
    ];
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Block className={Css.content()} header={(
        <Text category="story" segment="heading" type="h1">{detailData.listName}</Text>
      )}>
        <Block
          collapsible={true}
          header={(
            <Text category="story" segment="heading" type="h3">Description</Text>
          )}
        >
          <Uu5Elements.InfoGroup itemList={itemList} direction="horizontal" detailData/>
          <br/>
          <br/>
          <Text category="story" segment="body" type="common"> {detailData.description} </Text>
        </Block>

        <br/>
        <Block
          contentMaxHeight="calc(100vh / 2)"
          collapsible
          header={(
            <Text category="story" segment="heading" type="h3">List items</Text>
          )}
        >
          <div style={{display: "flex", width: "100%", justifyContent: "center", padding: "1em"}}>
            <Uu5Elements.Input
              value={newItemName}
              style={{width: "calc(500vw / 10 - 5vw)"}}
              placeholder = "Add another item.."
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <Uu5Elements.Button text="Add Item"
                                onClick={() => {
                                  setItems((prevItems) => [...prevItems, {
                                    id: Date.now().toString(),
                                    description: newItemName,
                                    state: 0
                                  }]);
                                  setLastUpdated(Date.now());
                                }}>Add Item</Uu5Elements.Button>
          </div>
          <table style={{display: "flex", width: "100%", justifyContent: "center"}}>
            <tbody>
            {
              detailData.items.map(item => {
                return (
                  <ListItemDetail name={item.id} label={item.description} value={item.state}
                                  onDelete={() => {
                                    setItems(items.filter((i) => i.id !== item.id));
                                    setLastUpdated(Date.now());
                                  }}
                                  onChange={() => {
                                    toggleItemState(item.id)
                                    setLastUpdated(Date.now());
                                  }}
                                  onItemUpdate={(itemId, itemName) => {
                                    updateItemName(itemId, itemName)
                                    setLastUpdated(Date.now());
                                  }}
                  />
                )
              })
            }
            </tbody>
          </table>
          <br/>
          <Uu5Elements.Button onClick={() => setRoute("home")}>
            Go Back
          </Uu5Elements.Button>
        </Block>
      </Block>
    );
    //@@viewOff:render
  }
});



Detail = withRoute(Detail);

//@@viewOn:exports
export {Detail};
export default Detail;
//@@viewOff:exports
