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



start();
async function start() {
  //declares variable to store current room
  let currentRoom = "";
  const welcomeMessage = `Welcome to Hogwarts, School of Witchcraft and Wizardry! Today you are tasked with a very important mission: find the remaining horcrux and destroy it to defeat Voldemort once and for all! Are you ready to defeat Voldemort?\n_`;
  let answer = await ask(welcomeMessage);
  while (answer.toLowerCase().trim() !== "yes") {
    answer = await ask("Say yes when you're ready to begin!\n_");
  }
  //the user has said yes - show them the room description for the first room

  while (answer !== "exit") {
    if (answer.toLowerCase().trim() == "yes") {
      enter(greatHall);
    currentRoom = greatHall;
    console.log("this is in the if statement")
    console.log(currentRoom)
    }

    answer = await ask("_");
    answer = answer.toLowerCase().trim();
    console.log(answer);
    console.log("this is in the while statement")
    console.log(currentRoom)
    switch (true) {
      //Megan
      case answer.includes("move"):
        console.log("this is within the switch statement:" + currentRoom)
        move(answer, currentRoom);
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
let gryffindorCommon = {
  status: "unlocked",
  roomDescription: [`Here dwell the brave at heart,
  their daring, nerve, and chivalry,
  set Gryffindors apart!
  
  The fire is roaring and the students are lounging. You overhear bits of conversations among the past heads of Gryffindor (all the way back to Godrick Gryffindor), as they appear and vanish in their portrait frames that line the walls. What is your move?`]
}
let greatHall = {
  roomName : "great hall", 
  status: "unlocked",
  roomDescription:
    "Welcome to the Great Hall! It is filled with students feasting on many treats, including your favorite- treacle tarts!.In the distance you see professor MgGonnagall with the sorting hat. What would you like to do?",
  items: ["sorting hat", "treacle tart"],
  possibleDirections: ["north", "south", "east"],
  north: {gryffindorCommon},
  west: false,
  //south: [ChamberOfSecrets],
  //east: [darkArtsClass]
};



//enter function
function enter(currentRoom) {
  console.log(currentRoom.roomDescription);
  console.log(typeof(currentRoom))
  console.log(typeof(gryffindorCommon.roomDescription))
  console.log("this is in the enter function") 
  console.log(currentRoom)
}
//move function 
function move (answer, currentRoom) {
  let direction = "";
 console.log("this is the first console.log in the move function")
 console.log(currentRoom)
  //assign direction to direction entered 
  if (answer.trim().toLowerCase().includes("south")) {
    direction = "south"
  } else if (answer.trim().toLowerCase().includes("north")) {
    direction = "north"; 
  } else if (answer.trim().toLowerCase().includes("east")) {
    direction = "east" 
  } else if (answer.trim().toLowerCase().includes("west")) {
    direction = "west" 
  } else {
    console.log("Gotta figure this out");
}
console.log("current direction =" + direction)
console.log("this is in the move function after the if/else statements")
console.log(currentRoom)
console.log(currentRoom[direction])
console.log("this is at the end of the move function")
console.log(currentRoom.roomDescription)
//check and see if direction is true/false 
if (currentRoom[direction] !== false) {
  //if true, the value that belongs to the direction key is the room in that direction, so go enter that room
  currentRoom = currentRoom[direction];
  enter(currentRoom)
  //if not, we want error message 
} else {
  console.log("Oh no! You've reached the castle wall. You can't go this way.")
}
}
//look around the room and see the items! 
function lookAround() {
  let items = currentRoom.items;
  console.log(`You look around and you see the following items: ${items}`)
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
