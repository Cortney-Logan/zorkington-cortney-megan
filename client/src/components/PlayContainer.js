import TextArea from "./TextArea.js";
import PlayerInput from "./PlayerInput.js";

function PlayContainer(props) {
  return (
    <div id="player-container">
      <TextArea
        player={props.player}
        setPlayer={props.setPlayer}
        itemKey={props.itemKey}
        description={props.description}
      />
      <PlayerInput
        player={props.player}
        setPlayer={props.setPlayer}
        itemKey={props.itemKey}
        answerItem={props.answerItem}
        setAnswerItem={props.setAnswerItem}
        answerAction={props.answerAction}
        setAnswerAction={props.setAnswerAction}
        setGame={props.setGame}
      />
    </div>
  );
}
export default PlayContainer;
