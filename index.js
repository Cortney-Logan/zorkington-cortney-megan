const { ENETRESET } = require("constants");
const { read } = require("fs");
const { exit } = require("process");
const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//enter function displays the room description
function enterRoom() {
  //stuff that makes you enter room
}

start();

async function start() {
  //declares variable to store current room
  let currentRoom = "";
  const welcomeMessage = `Welcome to Hogwarts, School of Witchcraft and Wizardry! Today you are tasked with a very important mission: find the remaining horcrux and destroy it to defeat Voldemort once and for all! Are you ready to defeat Voldemort?\n>_`;
  let answer = await ask(welcomeMessage);
  while (answer.toLowerCase().trim() !== "yes") {
    answer = await ask("Say yes when you're ready to begin!\n>_");
  }
  //the user has said yes - show them the room description for the first room
  enter(rooms["greatHall"]);
  currentRoom = "greatHall";

  //core of game - expects user input to move through rooms and interact with items.  Will continue to loop until the user enters 'exit'
  while (answer !== "exit") {
    //prompts the user for input
    answer = await ask(">_");
    //sanitizes the answer
    answer = answer.toLowerCase().trim();

    //accepts answer and breaks out into verb and noun
    answerArr = answerToArr(answer);

    answerAction = answerArr[0];
    answerItem = answerArr[1];

    //validates answer - check the verb against a wordbank of actions & check items against wordbank of items
    //if valid - enter switch statement, else print "I don't know how to"
    if (validateItem(answerItem)) {
      //determines action taken based on user input
      switch (true) {
        //Megan
        case answer.includes("move"):
          move();
          break;
        //Megan
        case answer.includes("look around"):
          lookAround();
          break;
        //Kavitha
        case answer.includes("take"):
          take();
          break;
        //Kavitha
        case answer.includes("check inventory"):
          checkInventory();
          break;
        //item interactions
        case answer.includes("examine"):
          //checks that the item is in the same room as the player
          if (checkRoom(answerItem, currentRoom)) {
            console.log(items[mapOfItems[answerItem]].examine());
            break;
          } else {
            //if item is not in the same room as the player, message is shown and prompts player for input
            console.log(
              `This is not possible - the ${answerItem} is not in this room.`
            );
            break;
          }
        case answer.includes("read"):
          //checks that the item is in the same room as the player
          if (checkRoom(answerItem, currentRoom)) {
            console.log(items[mapOfItems[answerItem]].read());
            break;
          } else {
            //if item is not in the same room as the player, message is shown and prompts player for input
            console.log(
              `This is not possible - the ${answerItem} is not in this room.`
            );
            break;
          }
        case answer.includes("greet"):
          //checks that the item is in the same room as the player
          if (checkRoom(answerItem, currentRoom)) {
            console.log(items[mapOfItems[answerItem]].greet());
            break;
          } else {
            //if item is not in the same room as the player, message is shown and prompts player for input
            console.log(
              `This is not possible - the ${answerItem} is not in this room.`
            );
            break;
          }

        default:
          console.log(`Sorry, I don't know how to ${answer}.`);
      }
    } else console.log(`Sorry, I don't know how to ${answer}.`);
  }
  console.log("Goodbye!");
  process.exit();
}

//function to turn answer into array to isolate verb and noun
function answerToArr(answer) {
  let answerArr = [];
  //the first word in the answer should be the action - make that the first element by slicing at the first space
  answerArr[0] = answer.slice(0, answer.indexOf(" "));
  //the remaining part of the answer is the noun
  answerArr[1] = answer.slice(answer.indexOf(" ") + 1);
  return answerArr;
}

//list of all the rooms and their qualities
let rooms = {
  greatHall: {
    status: "unlocked",
    roomDescription:
      "Welcome to the Great Hall! It is filled with students feasting on many treats, including your favorite- treacle tarts! In the distance you see Professor McGonagall with the Sorting Hat. What would you like to do?",
    items: ["sorting hat", "treacle tart"],
    possibleDirections: ["north", "south", "east"],
    north: "gryffindorCommon",
    west: false,
    south: "ChamberOfSecrets",
  },
};

//define items within the item object
let items = {
  sortingHat: {
    description: "here is a description for the sorting hat",
    movability: "permanent",
    currentRoom: "greatHall",
    examine: () => {
      return "\"Oh you may not think I'm pretty, but don't judge on what you see, I'll eat myself if you can find a smarter hat than me.\"";
    },
    read: () => {
      return "You cannot read the Sorting Hat";
    },
    greet: () => {
      return "Hello. I am the Sorting Hat.  I have a clue for you!  The answer lies in the secret chamber south of this great room.  To enter you must pocess that which will make you invisible to those around you.";
    },
    //include take, drop, use(?)
  },
  treacleTart: {
    description: "here is a description for the treacle tart",
    movability: "removable",
    currentRoom: "greatHall",
    examine: () => {
      return "Hogwart's treacle tarts are made to perfection with a flakey pastry and golden syrup; and of course no soggy bottoms.";
    },
    read: () => {
      return "You cannot read the treacle tart";
    },
    greet: () => {
      return "Not everything in Hogwarts is living...you can't greet a treacle tart.";
    },
  },
  riddleDiary: {
    description: "here is a description for Tom Riddle's Diary",
    movability: "removable",
    currentRoom: "gryffindorCommonRoom",
    examine: () => {
      return "You are examining the diary";
    },
    read: () => {
      return "You are reading the diary";
    },
    greet: () => {
      return "Hello. I am the diary of Tom Riddle";
    },
  },
};

//map of items
let mapOfItems = {
  treacletart: "treacleTart",
  "treacle tart": "treacleTart",
  tart: "treacleTart",
  sortinghat: "sortingHat",
  "sorting hat": "sortingHat",
  hat: "sortingHat",
  diary: "riddleDiary",
  "tom riddle's diary": "riddleDiary",
  "riddle's diary": "riddleDiary",
  "tom's diary": "riddleDiary",
  "riddle diary": "riddleDiary",
  "tom riddle diary": "riddleDiary",
  // n: "north",
  // s: "south",
  // e: "east",
  // w: "west",
  // north: "north",
  // south: "south",
  // east: "east",
  // west: "west",
};

//list of actions
let listOfActions = [
  "move",
  "look around",
  "take",
  "inventory",
  "examine",
  "read",
  "greet",
];

// //trims the answer to reveal the item called upon by removing each of the action verbs listed in the listOfActions array
// function isolateItem(answer) {
//   listOfActions.forEach(
//     (action) => (answer = answer.replace(action + " ", ""))
//   );
//   return answer;
// }

//returns true or false if the item is found in the mapOfItems
function validateItem(item) {
  if (Object.keys(mapOfItems).find((word) => word === item)) {
    return true;
  } else {
    return false;
  }
}

//confirms if the item being called upon is in the room the users is currently in
function checkRoom(item, currentRoom) {
  return items[mapOfItems[item]].currentRoom === currentRoom;
}

//enter room function
function enter(room) {
  currentRoom = room;
  console.log(currentRoom.roomDescription);
}

let direction = "south";
function move() {
  switch (true) {
    case answer.includes("south"):
      console.log("moving south");
      direction = "south";
      break;
    case answer.includes("north"):
      direction = "north";
      break;
    case answer.includes("east"):
      direction = "east";
      break;
    case answer.includes("west"):
      direction = "west";
      break;
    default:
      start();
  }
}

//room object template:
/*roomName = {
  status: "locked" "unlocked" 
  "roomDescription": " ", 
  items: [ ]  
  possibleDirections: , 
}*/

//create item class
