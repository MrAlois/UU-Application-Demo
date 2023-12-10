//@@viewOn:imports
import {createVisualComponent, useState, useRef, Fragment, useRoute, useCall, useRouter, Utils} from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import { Config } from "uu5g05-dev";
import ListEditModal from "./list-edit-modal";
import React from "react";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  checkbox: () =>
    Config.Css.css({
      margin: "0.5rem",
      alignSelf: "flex-end"
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ListCardPopoverMenu = createVisualComponent({
  render({ preferredPosition, children, itemList, icon, ...popoverProps }) {
    const [popoverSettings, setPopoverSettings] = useState(null);
    const buttonRef = useRef();
    const [route, setRoute] = useRoute()
    const [editOpen, setEditOpen] = useState(false);
    const [openDelete, setDeleteOpen] = useState(false);
    const [openArchive, setArchiveOpen] = useState(false);

    return (
      <>
        <Fragment>
          <Uu5Elements.Button
            icon={icon}
            elementRef={buttonRef}
            onClick={e => setPopoverSettings({ element: buttonRef.current, key: Math.random() })}
            pressed={!!(popoverSettings || {}).element}
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
              <Uu5Elements.MenuList itemList={itemList || [
                { children: "Edit", icon: "uugds-pencil", onClick: () => setEditOpen(true)},
                { children: "Archive", icon: "uugds-shield", onClick: () => setArchiveOpen(true)},
                { divider: true },
                { children: "Delete", icon: "uugds-delete", onClick: () => setDeleteOpen(true) },
              ]} />
            </Uu5Elements.Popover>
          )}
        </Fragment>

        <ListEditModal open={editOpen} onClose={() => setEditOpen(false)}></ListEditModal>
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
              onClick: () => alert("Deleted!"),
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
              onClick: () => alert("Archived!"),
              colorScheme: "red",
              significance: "highlighted",
            },
          ]}
        />
      </>
    );
  }
});

//@@viewOn:exports
export { ListCardPopoverMenu };
export default ListCardPopoverMenu;
//@@viewOff:exports
