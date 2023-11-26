//@@viewOn:imports
import {createVisualComponent, PropTypes, useRoute, useScreenSize, useSession} from "uu5g05";
import Uu5Elements, {Button, Icon, Text} from "uu5g05-elements";
import Config from "./config/config.js";
import ShoppingListCard from "./shopping-list-card";
import Uu5Forms from "uu5g05-forms";
import NamedCheckbox from "./named-checkbox";
import UU5 from "uu5g04";
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
      alignContent: "center"
    }),
  card: () =>
    Config.Css.css({
      padding: "1rem"
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShoppingListContainer = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListContainer",
  //@@viewOff:statics

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { data } = props
    const [route, setRoute] = useRoute()
    //@@viewOff:private

    //@@viewOn:render
    return (
      <div className={Css.container()}>
        <Uu5Elements.Grid templateColumns={{ xs: "1fr", m: "repeat(3, 1fr)"}}>
          <Uu5Elements.Grid.Item colSpan={3} justifySelf="end" alignSelf="center">
            <NamedCheckbox text="Show archived" propValue = {true}/>
          </Uu5Elements.Grid.Item>

          {
            data.map(item => {
              return (
                <Uu5Elements.Grid.Item>
                  <Uu5Elements.Box className={Css.card()}>
                    <ShoppingListCard listId={item.listId} listName ={item.listName} ownerName={item.ownerName} dateCreated={item.dateCreated} description={item.description}/>
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
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingListContainer };
export default ShoppingListContainer;
//@@viewOff:exports
