//@@viewOn:imports
import {createVisualComponent, useState, useRef, Fragment, createComponent} from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import {Config, LoremIpsum} from "uu5g05-dev";
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

const ShoppingListEditModalButton = createComponent({
  render({ header, ...props }) {
    const [open, setOpen] = useState();

    return (
      <Fragment>
        <Uu5Elements.Button onClick={() => setOpen(true)}>{header}</Uu5Elements.Button>
        <Uu5Elements.Modal {...props} header={header} open={open} onClose={() => setOpen(false)}>
          {props.children || <LoremIpsum paragraphCount={10} />}
        </Uu5Elements.Modal>
      </Fragment>
    );
  },
});

//@@viewOn:exports
export { ShoppingListEditModalButton };
export default ShoppingListEditModalButton;
//@@viewOff:exports
