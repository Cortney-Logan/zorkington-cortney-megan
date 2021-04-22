import { useState } from "react";

function PlayerInput(props) {
  //------------------------------State------------------------------//
  const [answer, setAnswer] = useState("");
  const [game, setGame] = useState(false);

  //------------------------------Actions------------------------------//
  //action key - given a string input maps to the corresponding action
  let listOfActions = {
    move: ["move", "travel", "go", "walk"],
    look: ["look", "scan", "survey", "view"],
    check: ["check"],
    take: ["take", "steal", "remove", "extract", "accio", "confiscate", "pick"],
    drop: [
      "drop",
      "abandon",
      "depulso",
      "let go of",
      "release",
      "reliquish",
      "set down",
      "leave",
    ],
    examine: ["examine", "look at", "inspect", "aparecium"],
    read: ["read"],
    greet: ["greet", "address", "talk to", "say hi", "meet"],
    unlock: ["open open open", "openopenopen"],
    putOn: ["put on", "wear"],
  };
  //----------------------------------------Functions-------------------------------//
  // handles changing input
  function handleChange(evt) {
    setAnswer(evt.target.value);
  }

  //function to turn answer into array to isolate verb and noun
  function splitAnswer(evt) {
    // prevents total page refresh
    evt.preventDefault();

    // clears input of form and resets to placeholder text
    setAnswer("");

    //declares answerArr variable as an array to hold the answer action and answer verb
    let answerArr = [];
    //creates an array of the available actions from listOfActions
    let actionKeys = Object.keys(listOfActions);
    //creates an array of the available items from the itemKey
    let itemKeys = Object.keys(props.itemKey);
    //the first part of the answer should be the action - compare the answer against the actionKey
    actionKeys.forEach((action) => {
      //for each action, there are multiple valid user inputs
      listOfActions[action].forEach((option) => {
        //if the user input is included in the listOfActions, return the valid action verb and store in answerArr[0]
        if (answer.includes(option)) {
          answerArr[0] = action;
        }
      });
      //for each item, if the item is included in the itemKey, return the valid item and store in answerArr1[]
      itemKeys.forEach((item) => {
        if (answer.includes(item)) {
          answerArr[1] = item;
        }
      });
    });

    props.playerMove(answerArr[0], answerArr[1]);
  }

  function beginGame() {
    props.startGame();
    setGame(true);
  }

  return (
    <div id="player-input">
      {" "}
      <form
        style={{ visibility: game ? "visible" : "hidden" }}
        onSubmit={splitAnswer}
      >
        <input
          type="text"
          placeholder="Enter Your Next Move"
          value={answer}
          onChange={handleChange}
        />
      </form>
      <button
        style={{ visibility: game ? "hidden" : "visible" }}
        className="button"
        onClick={beginGame}
      >
        ~ Enter ~
      </button>
    </div>
  );
}
export default PlayerInput;
