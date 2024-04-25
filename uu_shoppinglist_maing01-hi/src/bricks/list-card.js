//@@viewOn:imports
import {createVisualComponent, Fragment, useRef, useRoute, useState} from "uu5g05";

import Config from "./config/config.js";
import Uu5Elements, {Line, Link, Text} from "uu5g05-elements";
import ListEditModal from "./list-edit-modal";
import React from "react";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  cardBody: () =>
    Config.Css.css({
      padding: "1em",
    }),
  spaceBetween: () =>
    Config.Css.css({
      display: "flex",
      justifyContent: "space-between"
    })
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ListCardPopoverMenu = createVisualComponent({
  render({ preferredPosition, children, icon, ...popoverProps}) {
    const [popoverSettings, setPopoverSettings] = useState(null);
    const buttonRef = useRef();
    const [editOpen, setEditOpen] = useState(false);
    const [openDelete, setDeleteOpen] = useState(false);
    const [openArchive, setArchiveOpen] = useState(false);

    const isMember = popoverProps.owner?.id !== global.CURRENT_USER.id
    return (
      <>
        <Fragment>
          <Uu5Elements.Button
            icon={icon}
            elementRef={buttonRef}
            onClick={e => setPopoverSettings({ element: buttonRef.current, key: Math.random() })}
            pressed={!!(popoverSettings || {}).element}
            disabled={isMember}
          >
            {children}
          </Uu5Elements.Button>
          {popoverSettings && (
            <Uu5Elements.Popover
              {...popoverProps}
              {...popoverSettings}
              elementOffset={4}
              preferredPosition={preferredPosition}
              onClose={() => setPopoverSettings(null)}
              className={Config.Css.css`padding: 8px;`}
            >
              <Uu5Elements.MenuList itemList={[
                { children: "Edit", icon: "uugds-pencil", onClick: () => setEditOpen(true)},
                { children: "Archive", icon: "uugds-shield", onClick: () => setArchiveOpen(true)},
                { divider: true },
                { children: "Delete", icon: "uugds-delete", onClick: () => setDeleteOpen(true) },
              ]} />
            </Uu5Elements.Popover>
          )}
        </Fragment>

        <ListEditModal
          open={editOpen}
          creating={false}
          onClose={() => setEditOpen(false)}
          onSubmit={(data) => {
            data.owner = global.ALL_USERS.find(user => user.id === data.ownerId);
            data.members = data.memberIds.map(memberId => global.ALL_USERS.find(user => user.id === memberId));
            return popoverProps.updateList(popoverProps.listId, data);
          }}
          {...popoverProps}
        />

        <Uu5Elements.Dialog
          open={openDelete}
          onClose={() => setDeleteOpen(false)}
          header="Delete this list?"
          icon={<Uu5Elements.Svg code="uugdssvg-svg-delete" />}
          info="List data cannot be recovered"
          actionDirection="horizontal"
          actionList={[
            {
              children: "Cancel",
              onClick: () => console.log("Cancel"),
            },
            {
              children: "Delete",
              onClick: () => popoverProps.deleteList(popoverProps.listId),
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
              onClick: () => popoverProps.updateList(popoverProps.listId, { archived: true}),
              colorScheme: "red",
              significance: "highlighted",
            },
          ]}
        />
      </>
    );
  }
});

const ListCard = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListCard",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    listId: "string",
    listName: "string",
    //owner: "string",
    lastUpdated: "string",
    description: "string",
    archived: "boolean",
    //members: [array
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    listId: "0",
    listName: "Undefined list",
    dateCreated: new Date().toLocaleDateString(),
    owner: {
      id: "0",
      name: "Undefined owner"
    },
    lastUpdated: "string",
    description: "string",
    archived: true,
    members: []
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [route, setRoute] = useRoute()

    function trimDescription(description) {
        return description.length > 200 ? `${description.substring(0, 200)}...` : description;
    }

    function showMemberCountHint(){
      if (props.members.length > 0) {
        return (
          <Text category="story" segment="body" type="minor" colorScheme="dim">
             +{props.members.length} member{props.members.length === 1 ? "" : "s"}
          </Text>
        );
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <div className={Css.cardBody()}>
        <div className={Css.spaceBetween()}>
          <Link colorScheme={props.archived ? "secondary" : "primary"}  onClick={() => setRoute("detail", { id: props.listId })}>
            <Text category="story" segment="heading" type="h4">{props.listName}</Text>
          </Link>
          <ListCardPopoverMenu icon={UU5.Icons.menu} preferredPosition="bottom-right" {...props}/>
        </div>

        <p></p>
        <Line/>

        <div className={Css.spaceBetween()}>
          <Text category="story" segment="body" type="minor">Owner:  {props.owner.name} {showMemberCountHint()}</Text>

          <Text category="story" segment="body" type="minor">{props.dateCreated}</Text>
        </div>

        <p></p>
        <Text autoFit={true} category="story" segment="body" type="common">{trimDescription(props.description)}</Text>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListCard };
export default ListCard;
//@@viewOff:exports
