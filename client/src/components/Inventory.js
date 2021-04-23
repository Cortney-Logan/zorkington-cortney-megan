// https://icon-icons.com/pack/Harry-Potter-Colour-Collection/1352&page=1
// PIE: <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
// DIARY: <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

import cloak from "./images/cloak.svg";
import fang from "./images/fang.svg";
import sword from "./images/sword.svg";
import tart from "./images/tart.svg";
import cup from "./images/cup.svg";
import diary from "./images/diary.svg";
import potionBook from "./images/book.svg";

function Inventory(props) {
  let inventoryMap = {
    "Tom Riddle's Diary": diary,
    "Invisibility Cloak": cloak,
    "Treacle Tart": tart,
    "Advanced Potion-Making": potionBook,
    "House Cup": cup,
    "Basilisk Fang": fang,
    "Sword of Gryffindor": sword,
  };

  console.log("inside inventory comp inventory is", props.inventory);
  console.log("type of inventory is", typeof props.inventory);

  props.inventory &&
    props.inventory.forEach((item) => {
      console.log(item);
      // <img className="inventory-item" src={inventoryMap[item]}/ >
    });

  return (
    <div id="inventory-container">
      <h3>Inventory</h3>
      <div id="inventory">
        {props.inventory &&
          props.inventory.map((item, index) => {
            return (
              <img
                key={index}
                className="inventory-item"
                src={inventoryMap[item]}
              />
            );
          })}
      </div>
    </div>
  );
}
export default Inventory;
