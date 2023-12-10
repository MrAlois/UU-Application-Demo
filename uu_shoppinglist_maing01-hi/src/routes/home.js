//@@viewOn:imports
import {
  createVisualComponent, useSession,
} from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import Uu5Elements, {Block, Text} from "uu5g05-elements";
import NamedCheckbox from "../bricks/named-checkbox";
import ListCard from "../bricks/list-card";
//@@viewOff:imports

//@@viewOn:constants
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
    let staticData = [
      {
        id: "1",
        listName: "Yes!",
        ownerName: "Alois Šenkyřík",
        dateCreated: "10-03-1996",
        description: "Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Mauris dictum facilisis augue. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Fusce consectetuer risus a nunc. Pellentesque arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas aliquet accumsan leo. Maecenas libero. Vivamus ac leo pretium faucibus. Maecenas libero. Pellentesque arcu."
      },
      {
        id: "2",
        listName: "Hej!",
        ownerName: "Alois Šenkyřík",
        dateCreated: "10-02-1996",
        description: "In laoreet, magna id viverra tincidunt, sem odio bibendum justo."
      },
      {
        id: "3",
        listName: "Ahoj!",
        ownerName: "Alois Šenkyřík",
        dateCreated: "10-02-2013",
        description: "Nulla non lectus sed nisl molestie malesuada. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Vivamus porttitor turpis ac leo. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. "
      },
      {
        id: "4",
        listName: "Nikoliv!",
        ownerName: "Alois Šenkyřík",
        description: "Nulla non lectus sed nisl molestie malesuada. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Vivamus porttitor turpis ac leo. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. "
      },
    ];
    const { identity } = useSession();

    //@@viewOff:private

    //@@viewOn:render
    return (
      <div className={Css.container()}>
        <Block
          header={(
            <Text category="story" segment="heading" type="h1">{identity.name + "'s shopping lists!"}</Text>
          )}
        >
          <Uu5Elements.Grid
            flow="dense"
            templateRows="auto"
            templateColumns={{ xs: "1fr", m: "repeat(3, 1fr)"}}
            columnGap={32}
          >
            <Uu5Elements.Grid.Item colSpan={3} justifySelf="end" alignSelf="center">
              <NamedCheckbox text="Show archived" propValue = {true}/>
            </Uu5Elements.Grid.Item>

            {
              staticData.map(item => {
                return (
                  <Uu5Elements.Grid.Item>
                    <Uu5Elements.Box className={Css.card()}>
                      <ListCard listId={item.listId} listName ={item.listName} ownerName={item.ownerName} dateCreated={item.dateCreated} description={item.description}/>
                    </Uu5Elements.Box>
                  </Uu5Elements.Grid.Item>
                )
              })
            }

            <Uu5Elements.Grid.Item>
              <Uu5Elements.Box shape="interactiveItem" onClick={event => setRoute("create")} className={Css.card()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Text style={{ margin: 'auto', fontSize: '7rem', color: 'grey'}} significance="subdued">+</Text>
              </Uu5Elements.Box>
            </Uu5Elements.Grid.Item>
          </Uu5Elements.Grid>
        </Block>
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
