//@@viewOn:imports
import {createVisualComponent, useState, useRef, Fragment, useRoute, useCall} from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import { Config } from "uu5g05-dev";
import ShoppingListEditModalButton from "./shopping-list-edit-modal";
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

const PopoverMenu = createVisualComponent({
  render({ preferredPosition, children, itemList, icon, ...popoverProps }) {
    const [popoverSettings, setPopoverSettings] = useState(null);
    const buttonRef = useRef();
    const navigate = useRoute();

    return (
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
              { children: "Edit", icon: "uugds-pencil", onClick: () => navigate.setRoute("/create")},
              { children: "Archive", icon: "uugds-shield", onClick: () => alert("Archiving!")},
              { divider: true },
              { children: "Delete", icon: "uugds-delete", onClick: () => alert("Deleting!") },
            ]} />
          </Uu5Elements.Popover>
        )}
      </Fragment>
    );
  }
});

//@@viewOn:exports
export { PopoverMenu };
export default PopoverMenu;
//@@viewOff:exports
