//@@viewOn:imports
import {
  createVisualComponent, useSession, useState,
} from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import Uu5Elements, {Block, Text} from "uu5g05-elements";
import ListCard from "../bricks/list-card";
import ListEditModal from "../bricks/list-edit-modal";
import React from "react";
//@@viewOff:imports

//@@viewOn:constants
global.ALL_LISTS = [
  {
    listId: "1",
    listName: "Testing list #1",
    owner: {
      id: "1",
      name: "Alois Šenkyřík"
    },
    archived: false,
    dateCreated: "10-03-1996",
    description: "Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Mauris dictum facilisis augue. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Fusce consectetuer risus a nunc. Pellentesque arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas aliquet accumsan leo. Maecenas libero. Vivamus ac leo pretium faucibus. Maecenas libero. Pellentesque arcu.",
    members: [{ id: "5", name: "Linda Špagátová" }]
  },
  {
    listId: "2",
    listName: "Testing list #2",
    owner: {
      id: "1",
      name: "Alois Šenkyřík"
    },
    archived: false,
    dateCreated: "10-02-1996",
    description: "In laoreet, magna id viverra tincidunt, sem odio bibendum justo.",
    members: []
  },
  {
    listId: "3",
    listName: "Slivovitz shopping!",
    owner: {
      id: "2",
      name: "Bolek Polívka"
    },
    archived: false,
    dateCreated: "10-02-2013",
    description: "Sample of a foreign shopping list that I am a member of. #1",
    members: [{id: "1", name: "Alois Šenkyřík"}]
  },
  {
    listId: "4",
    listName: "Becherovka shopping!",
    owner: {
      id: "3",
      name: "Miloš Zeman"
    },
    archived: false,
    description: "Sample of a foreign shopping list that I am a member of #2",
    members: [{id: "1", name: "Alois Šenkyřík"}, {id: "4", name: "Mr. Robot"}]
  },
  {
    listId: "5",
    listName: "Testing list #3 (Archived)!",
    owner: {
      id: "1",
      name: "Alois Šenkyřík"
    },
    archived: true,
    description: "Archived shopping list.",
    members: []
  },
];

global.ALL_USERS = [
  { id: "1", name: "Alois Šenkyřík" },
  { id: "2", name: "Bolek Polívka" },
  { id: "3", name: "Miloš Zeman" },
  { id: "4", name: "Mr. Robot" },
  { id: "5", name: "Linda Špagátová" }
]
//@@viewOff:constants

//@@viewOn:css
const Css = {
  container: () =>
    Config.Css.css({
      margin: "2rem",
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      alignContent: "center",
      width: "96.5%",
      flex: "0 0 auto"
    }),
  card: () =>
    Config.Css.css({
      padding: "1rem"
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Home = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Lists",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:private
    const { identity } = useSession();
    const [openCreateListModal, setOpenCreateListModal] = useState(false);
    const [showArchived, setShowArchived] = useState(false);
    const [listItems, setListItems] = useState(global.ALL_LISTS);

    function createList(newItem) {
      const randomListId = Math.floor((Math.random() + 10) * 1000000);
      const newList = [...global.ALL_LISTS, { ...newItem, listId: randomListId }];
      global.ALL_LISTS = newList;
      setListItems(newList);
    }

    function renderListItems() {
      function updateList(listId, updatedProperties) {
        const newList = global.ALL_LISTS.map(item => {
          if (item.listId === listId) {
            return { ...item, ...updatedProperties }; //merges existing item properties with updatedProperties
          }
          return item; //returns item as is if it doesn't match the listId
        });

        global.ALL_LISTS = newList;
        setListItems(newList); //setting the new list
      }

      function deleteList(listId) {
        const newList = global.ALL_LISTS.filter(list => list.listId !== listId);
        global.ALL_LISTS = newList;
        setListItems(newList);
      }

      return listItems
        .filter(item=> (showArchived ? true : !item.archived))
        .map(item=> {
          return (
            <Uu5Elements.Grid.Item>
              <Uu5Elements.Box className={Css.card()}>
                <ListCard
                  {...item}
                  deleteList={deleteList}
                  updateList={updateList}
                />
              </Uu5Elements.Box>
            </Uu5Elements.Grid.Item>
          )
        });
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
        identity.name == null
          ? <Text category="story" segment="heading" type="h1">{"Log in please"}</Text>
          : <div className={Css.container()}>
            <Block
                header={(
                    <Text category="story" segment="heading" type="h1">{identity.name + "'s shopping lists!"}</Text>
                )}
            >
                <Uu5Elements.Grid
                    flow="dense"
                    templateRows="auto"
                    templateColumns={{xs: "1fr", m: "repeat(3, 1fr)"}}
                    columnGap={32}
                >
                    <Uu5Elements.Grid.Item colSpan={3} justifySelf="end" alignSelf="center">
                        <Uu5Elements.Toggle
                          label="Show archived"
                          value={showArchived}
                          onChange={(e) => setShowArchived(!showArchived)}
                          box
                        />
                    </Uu5Elements.Grid.Item>

                  {renderListItems()}

                  <Uu5Elements.Grid.Item>
                    <Uu5Elements.Box shape="interactiveItem" onClick={event => setOpenCreateListModal(true)}
                                     className={Css.card()} style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                    }}>
                        <Text style={{margin: 'auto', fontSize: '7rem', color: 'grey'}} significance="subdued">+</Text>
                    </Uu5Elements.Box>
                  </Uu5Elements.Grid.Item>
                </Uu5Elements.Grid>
            </Block>

            <ListEditModal
              header={"Creating list"}
              open={openCreateListModal}
              onClose={() => setOpenCreateListModal(false)}
              onSubmit={(data) => createList(data)}
              listName="New List"
              creating={true}
              members={[]}
            />
          </div>
    );
    //@@viewOff:render
  }
});

Home = withRoute(Home);

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports
