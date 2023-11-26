//@@viewOn:imports
import {
  createVisualComponent, useSession,
} from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import ShoppingListContainer from "../bricks/shopping-list-container";
import ShoppingListHeader from "../bricks/shopping-header";
import {LoremIpsum} from "uu5g05-dev";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
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
    const staticData = [
      {
        listName: "Yes!",
        ownerName: "Alois Šenkyřík",
        dateCreated: "10-03-1996",
        description: "Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Mauris dictum facilisis augue. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Fusce consectetuer risus a nunc. Pellentesque arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas aliquet accumsan leo. Maecenas libero. Vivamus ac leo pretium faucibus. Maecenas libero. Pellentesque arcu."
      },
      {
        listName: "Hej!",
        ownerName: "Alois Šenkyřík",
        dateCreated: "10-02-1996",
        description: "In laoreet, magna id viverra tincidunt, sem odio bibendum justo."
      },
      {
        listName: "Ahoj!",
        ownerName: "Alois Šenkyřík",
        dateCreated: "10-02-2013",
        description: "Nulla non lectus sed nisl molestie malesuada. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Vivamus porttitor turpis ac leo. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. "
      },
      {
        listName: "Nikoliv!",
        ownerName: "Alois Šenkyřík",
        description: "Nulla non lectus sed nisl molestie malesuada. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Vivamus porttitor turpis ac leo. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. "
      },
    ];
    const { identity } = useSession();

    //@@viewOff:private

    //@@viewOn:render
    return (
      <div>
        <ShoppingListHeader text={identity.name + "'s shopping lists!"}></ShoppingListHeader>
        <ShoppingListContainer data={staticData}></ShoppingListContainer>
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
