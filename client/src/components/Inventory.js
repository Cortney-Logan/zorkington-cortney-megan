// https://icon-icons.com/pack/Harry-Potter-Colour-Collection/1352&page=1
import cloak from "./images/cloak.svg";
import fang from "./images/fang.svg";
import sword from "./images/sword.svg";

function Inventory(props) {
  return (
    <div id="inventory-container">
      <h3>Inventory</h3>
      <div id="inventory">
        <img src={cloak} className="inventory-item" />
        <img src={fang} className="inventory-item" />
        <img src={sword} className="inventory-item" />
      </div>
    </div>
  );
}
export default Inventory;
