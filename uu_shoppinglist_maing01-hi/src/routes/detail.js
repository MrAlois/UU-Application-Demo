//@@viewOn:imports
import {
  Content,
  createVisualComponent, useSession, useState,
} from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import {Block, Box, Text} from "uu5g05-elements";
import ListDetailItem from "../bricks/list-detail-item";
import Uu5Elements from "uu5g05-elements";
import ListCard from "../bricks/list-card";
import ListEditModal from "../bricks/list-edit-modal";
import React from "react";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  content: () =>
    Config.Css.css({
      padding: "2rem"
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
          <Uu5Elements.Button icon="uugds-pencil" onClick={() => setEditOpen(true)} {...props}>
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
              onClick: () => alert("Deleting!"),
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
              children: "Delete",
              onClick: () => alert("Archiving!"),
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
        />
      </Content>
    );
  },
});

function createNumberSummary(items){
  const doneCount = items.filter((item) => item.state === 1).length
  return doneCount + " / " + items.length ;
}

let Detail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Detail",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lorem = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam posuere lacus quis dolor. Pellentesque sapien. Pellentesque pretium lectus id turpis. Nam sed tellus id magna elementum tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla est. Maecenas aliquet accumsan leo. Nullam faucibus mi quis velit. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Suspendisse nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Aenean vel massa quis mauris vehicula lacinia. Morbi leo mi, nonummy eget tristique non, rhoncus non leo.";
    const detailData = {
      listName: "Testing list 1",
      ownerName: "Alois Šenkyřík",
      dateCreated: "10.12.2023",
      dateUpdate: "10.12.2023",
      description: lorem,
      members: ["Linda Kotlíková", "Bolek Polívka", "Miloš Zeman"],
      items: [
        {id: "1", description: "Tralalalal", state: 0},
        {id: "2", description: "Johohooh", state: 0},
        {id: "3", description: "Uvař vodue dolej víno", state: 0},
        {id: "4", description: "Muhahaha", state: 0},
        {id: "5", description: "Tralalaweaweal", state: 0},
        {id: "6", description: "AWEFAGHfaefAGGAG145", state: 0},
        {id: "1", description: ":):):):):(", state: 0}
      ]
    };
    const itemList = [
      {
        imageSrc: "https://cdn.plus4u.net/uu-plus4u5g01/4.0.0/assets/img/anonymous.png",
        subtitle: "Owner",
        title: detailData.ownerName,
      },
      { subtitle: "Date of creation", title: detailData.dateCreated },
      { subtitle: "Date of update", title: detailData.dateUpdate },
      { subtitle: "Completed tasks", title: createNumberSummary(detailData.items) },
      { subtitle: "Members", title: detailData.members.join(", ")},
      { component: ListMenu }
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

          <table>
            <tbody>
            {
              detailData.items.map(item => {
                return (
                  <ListDetailItem name={item.id} label={item.description} value={item.state} onDelete={() => {
                  }}/>
                )
              })
            }
            </tbody>
          </table>

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
