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
  const welcomeMessage = `Welcome to Hogwarts, School of Witchcraft and Wizardry! Today you are tasked with a very important mission: find the remaining horcrux and destroy it to defeat Voldemort once and for all! Are you ready to defeat Voldemort?\n>_`;
  let answer = await ask(welcomeMessage);
  while (answer.toLowerCase().trim() !== "yes") {
    answer = await ask("Say yes when you're ready to begin!\n>_");
  }
  //the user has said yes - show them the room description for the first room

  //core of game - expects user input to move through rooms and interact with items.  Will continue to loop until the user enters 'exit'
  while (answer !== "exit") {
    if (answer.toLowerCase().trim() == "yes") {
      enter(greatHall);
    currentRoom = greatHall;
    console.log("this is in the if statement")
    console.log(currentRoom)
    }

    answer = await ask("_");
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
        console.log("this is within the switch statement:" + currentRoom)
        move(answer, currentRoom);
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
//look around the room and see the items! 
function lookAround() {
  let items = currentRoom.items;
  console.log(`You look around and you see the following items: ${items}`)
}





//room object template:
/*roomName = {
  status: "locked" "unlocked"
  "roomDescription": " ",
  items: [ ]
  possibleDirections: ,
}*/

//create item class
/*let inventory = []
class checkInventory {
  constructor(name, description, takeable) {
    this.name = name,// name of the object
      this.description = description,// text about the object when player grabs it
    this.takeable = takeable
  }
  moreInfo() {
    return (this.description)
  }
  take() {
    if (this.takeable) {
      inventory.push(this.name)
      return ('you have picked ' + this.name + ', you have ' + inventory)
    }
    else {
      return ("you can't take that " + this.description)
    }
    
  }


}

let diary = new checkInventory('diary', 'Tom Riddle’s Diary', true)
console.log(diary.take())
let scroll = new checkInventory('scroll', 'Instructions', false)
console.log(scroll.take())
let fabric = new checkInventory('fabric', 'description',true)
console.log(fabric.take())
let Horcrux = new checkInventory('Horcrux', 'description', false)
console.log(Horcrux.take())
let TreacleTart = new checkInventory('Treacle Tart', 'Tom Riddle’s Diary', true)
console.log(TreacleTart.take())
let sortingHat = new checkInventory('Sorting Hat', 'Tom Riddle’s Diary', false)
console.log(sortingHat.take())
let book = new checkInventory('Book', 'Tom Riddle’s Diary', true)
console.log(book.take())
let paper = new checkInventory('Paper', 'Tom Riddle’s Diary', false)
console.log(paper.take())

drop();


//would like to drop an item
// yes
//which item
//1=diary, 2= scroll.....
//player inputs a number of the item to be dropped

 async function drop()
{
  console.log("which item would you like to drop?")
  
  for (i=0;i<inventory.length;i++){
  console.log(i +"-" +inventory[i])
}
userInp= await ask('please input the item number to be removed: ')

  inventory.splice(parseInt(userInp),1)// index,how many item to be removed
  console.log( 'you have ' + inventory)
}
*/