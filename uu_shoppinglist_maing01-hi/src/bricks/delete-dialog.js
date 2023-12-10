// //@@viewOn:imports
// import {createVisualComponent, useState, useRef, Fragment, useRoute, useCall, useRouter, Utils} from "uu5g05";
// import Uu5Elements from "uu5g05-elements";
// import { Config } from "uu5g05-dev";
// import ListEditModal from "./list-edit-modal";
// import React from "react";
// //@@viewOff:imports
//
// //@@viewOn:css
// const Css = {
//   checkbox: () =>
//     Config.Css.css({
//       margin: "0.5rem",
//       alignSelf: "flex-end"
//     }),
// };
// //@@viewOff:css
//
// //@@viewOn:helpers
// //@@viewOff:helpers
//
// const ListCardPopoverMenu = createVisualComponent({
//   render(props) {
//     const [open, setOpen] = useState(false);
//
//     const {onDelete, } = props
//     return (
//       <Uu5Elements.Dialog
//         open={open}
//         onClose={() => setOpen(false)}
//         header="Delete this file?"
//         icon={<Uu5Elements.Svg code="uugdssvg-svg-delete" />}
//         info="File data cannot be recovered"
//         actionDirection="horizontal"
//         actionList={[
//           {
//             children: "Cancel",
//             onClick: () => console.log("Cancel"),
//           },
//           {
//             children: "Delete",
//             onClick: () => console.log("Delete"),
//             colorScheme: "red",
//             significance: "highlighted",
//           },
//         ]}
//       />
//     );
//   }
// });
//
// //@@viewOn:exports
// export { ListCardPopoverMenu };
// export default ListCardPopoverMenu;
// //@@viewOff:exports
