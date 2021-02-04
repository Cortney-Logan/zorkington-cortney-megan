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

//room objects

//item objects

//enter function displays the room description
function enterRoom() {
  //stuff that makes you enter room
}

start();

async function start() {
  //declares variable to store current room
  let currentRoom = "";
  const welcomeMessage = `Welcome to Hogwarts, School of Witchcraft and Wizardry! Today you are tasked with a very important mission: find the remaining horcrux and destroy it to defeat Voldemort once and for all! Are you ready to defeat Voldemort?\n`;
  let answer = await ask(welcomeMessage);
  while (answer.toLowerCase().trim() !== "yes") {
    answer = await ask("Say yes when you're ready to begin!\n");
  }
  //the user has said yes - show them the room description for the first room
  enter(greatHall);

  while (answer !== "exit") {
    answer = await ask("_");
    answer = answer.toLowerCase().trim();
    console.log(answer);
    switch (true) {
      //Megan
      case answer.includes("move"):
        move();
        break;
        //Megan
      case answer.includes("look around"):
        lookAround();
        break;
        //Cortney
      case answer.includes("examine"):
        examine();
        break;
        //Cortney
      case answer.includes("read"):
        read();
        break;
        //Cortney
      case answer.includes("greet"):
        greet();
        break;
        //Kavitha
      case answer.includes("take"):
        take();
        break;
        //Kavitha
      case answer.includes("check inventory"):
        checkInventory();
        break;

      default:
        console.log(`Sorry, I don't know how to ${answer}.`);
    }
  }
  console.log("Goodbye!");
  process.exit();
}

//list of all the rooms and their qualities 
rooms = {
greatHall = {
  status: "unlocked", 
  roomDescription: "Welcome to the Great Hall! It is filled with students feasting on many treats, including your favorite- treacle tarts!.In the distance you see professor MgGonnagall with the sorting hat. What would you like to do?", 
  items: ["sorting hat", "treacle tart"], 
  possibleDirections:["north", "south", "east"],
  north: gryffindorCommon,
  west: false, 
  south: ChamberOfSecrets, 
}, 

}

function enter(room) {
  currentRoom = room;
  console.log(currentRoom.roomDescription);
}

let direction = "south" 
function move () {
  switch (true) {
    case answer.includes("south") : direction = "south"; 
    break; 
    case answer.includes("north") : direction = "north"; 
    break; 
    case answer.includes("east") : direction = "east" 
    break; 
    case answer.includes("west") : direction = "west" 
    break; 
    default start();
  }

  }



///adding in some comments for practice
//with git hub
//cant wait for this to work amazingly!

//room object template:
/*roomName = {
  status: "locked" "unlocked" 
  "roomDescription": " ", 
  items: [ ]  
  possibleDirections: , 
}*/
