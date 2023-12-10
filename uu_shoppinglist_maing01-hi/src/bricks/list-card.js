//@@viewOn:imports
import {Utils, createVisualComponent, PropTypes, useScreenSize, useState, useRoute} from "uu5g05";

import Config from "./config/config.js";
import {Box, Button, Line, Link, Text} from "uu5g05-elements";
import ListCardPopoverMenu from "./list-card-popover-menu";
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

const ListCard = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListCard",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    listId: "string",
    listName: "string",
    ownerName: "string",
    dateCreated: "date",
    description: "string",
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    listName: "Undefined",
    ownerName: "<Unknown>",
    dateCreated: "DD-MM-YYYY",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const loremIpsum = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed convallis magna eu sem. Nunc auctor. In rutrum. In enim a arcu imperdiet malesuada. Maecenas lorem. Aenean fermentum risus id tortor. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.";
    const { listId, listName, ownerName, dateCreated, description = loremIpsum} = props;

    const [route, setRoute] = useRoute()
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div className={Css.cardBody()}>
        <div className={Css.spaceBetween()}>
          <Link colorScheme="primary" target="_self" onClick={event => setRoute("/detail", {id: listId})}>
            <Text category="story" segment="heading" type="h4">{listName}</Text>
          </Link>
          <ListCardPopoverMenu icon={UU5.Icons.menu} preferredPosition="bottom-right"/>
        </div>

        <p></p>
        <Line/>

        <div className={Css.spaceBetween()}>
          <Text category="story" segment="body" type="minor">Owner:  {ownerName}</Text>
          <Text category="story" segment="body" type="minor">{dateCreated}</Text>
        </div>

        <p></p>
        <Text autoFit={true} category="story" segment="body" type="common">{description.substring(0, 200)} {description.length >= 200 && '...'}</Text>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListCard };
export default ListCard;
//@@viewOff:exports
