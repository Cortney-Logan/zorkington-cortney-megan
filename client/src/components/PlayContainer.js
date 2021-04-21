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
        details={props.details}
      />
      <PlayerInput
        player={props.player}
        setPlayer={props.setPlayer}
        itemKey={props.itemKey}
        answerItem={props.answerItem}
        setAnswerItem={props.setAnswerItem}
        answerAction={props.answerAction}
        setAnswerAction={props.setAnswerAction}
        startGame={props.startGame}
        playerMove={props.playerMove}
      />
    </div>
  );
}
export default PlayContainer;
