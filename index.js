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
//-------Player-----//
//defines an object to hold information about the player
let player = {
  name: "Player1",
  inventory: [],
  currentRoom: "",
};

//--------------------Rooms------------------------------//

class Room {
  constructor(
    isUnlocked,
    roomDescription,
    itemsInRoom,
    north,
    east,
    south,
    west
  ) {
    this.isUnlocked = isUnlocked;
    this.roomDescription = roomDescription;
    this.itemsInRoom = itemsInRoom;
    this.north = north;
    this.east = east;
    this.south = south;
    this.west = west;
  }

  //when entering a new room, the room description method is accessed which prints the room description
  enter() {
    console.log(this.roomDescription);
  }

  //function to move a character into a new room
  move(answerItem) {
    //declares a variable to hold the direction the user wants to move
    let direction = answerItem;
    //declares a variable that holds what the target room is based on the directional properties in the current room
    let newRoom = roomKey[this[direction]];
    //if there is a value in the requested direction from the current room is true, there is a room that can be entered
    if (this[direction]) {
      //if a new room is locked, checks unlock conditions for access
      if (!newRoom.isUnlocked) {
        //check if unlock conditions are met for the currently locked room
        switch (newRoom) {
          case "chamberOfSecrets":
            if (player.inventory.includes("cloak")) {
              roomKey[newRoom].isUnlocked = true;
              break;
            } else {
              console.log("This room is locked!");
              break;
            }
          // case "roomOfRequirement":
          //   console.log("you are trying to access the room of requirement");
          //     let password = await ask(
          //       "To enter this room you must say the magic words. If you know them please enter them now: "
          //     );
          //     if (password === "open.") {
          //       console.log("you've opened the room of requirement");
          //       roomKey[newRoom].isUnlocked = true;
          //       roomOfRequirement.enter();
          //       break;
          //     } else {
          //       console.log("This room is locked!");
          //       break;
          //     }
        }
      }
      //checks if the new room is locked by accessing the isUnlocked property of the new room
      if (newRoom.isUnlocked) {
        //if the room is unlocked, enter the new room and change the player's current room property to the new room
        player.currentRoom = roomKey[this[direction]];
        player.currentRoom.enter();
      }
    }
    //if the value of the requested direction from the current room is false, the player cannot move in that direction
    else {
      console.log(
        "You've encountered Filch who carries deep disdain in his heart for wandering students. You can't go this way!"
      );
    }
  }

  //look around the room and see the room's inventory:

  lookAround() {
    let currentItems = player.currentRoom.itemsInRoom;
    console.log("You look around and you see the following items:");
    for (let item of currentItems) console.log(item);
  }
}
// list of all of our rooms:
let greatHall = new Room(
  true,
  "Welcome to the Great Hall! It is filled with students feasting on many treats, including your favorite- treacle tarts! In the distance you see Professor McGonagall with the sorting hat. If you look around you'll see many things! What would you like to do?",
  ["\nsorting hat", "\ntreacle tart"],
  "gryffindorCommon",
  "darkArtsClass",
  "chamberOfSecrets",
  false
);

let gryffindorCommon = new Room(
  true,
  `Here dwell the brave at heart,
their daring, nerve, and chivalry,
set Gryffindors apart!

The fire is roaring and the students are lounging. You overhear bits of conversations among the past heads of Gryffindor (all the way back to Godrick Gryffindor), as they appear and vanish in their portrait frames that line the walls. You see a glimmering fabric in the corner of the room. What is your move?`,
  ["invisibility cloak", "portrait of Godrick Gryffindor"],
  false,
  "library",
  "greatHall",
  false
);

let library = new Room(
  true,
  `Welcome to the Hogwarts library, where tens of thousands of books on thousands of shelves.`,
  [
    "A scroll which contains a brief history of the Room of Requirement",
    "Tom Riddle's Diary",
  ],
  false,
  false,
  "darkArtsClass",
  "gryffindorCommon"
);

let darkArtsClass = new Room(
  true,
  `You are now in the Defense Against the Dark Arts classroom.  Who is teaching this year?  You really shouldn’t bother figuring out, they’ll be gone before too long….

Several rows of desks line the classroom, the professor’s desk is cluttered with copies of Advanced Potion-Making and scrolls.`,
  ["Advanced Potion-Making textbook", "chalk board"],
  "library",
  false,
  "roomOfRequirement",
  "greatHall"
);

let chamberOfSecrets = new Room(
  false,
  ` Enemies of the Heir, beware! The Chamber of Secrets has been opened! You are standing in a large pipe at the entrance to the Chamber. In front of you is the decaying skeleton of the Basilisk.  Near its giant head you see a glimmer of light.`,
  ["mirror", "House Cup"],
  "greatHall",
  "roomOfRequirement",
  false,
  false
);

let roomOfRequirement = new Room(
  false,
  `Welcome to the Room of Requirement! As Dobby describes it to Harry Potter, “It is a room that a person can only enter when they have real need of it. Sometimes it is there, and sometimes it is not, but when it appears, it is always equipped for the seeker's needs."  You look around and notice many items left by other students who were once in need.`,
  ["Vanishing Cabinet", "basilisk fang", "Sword of Godrick Gryffindor"],
  "darkArtsClass",
  false,
  false,
  "chamberOfSecrets"
);

//room key
let roomKey = {
  gryffindorCommon: gryffindorCommon,
  "gryffindor common room": gryffindorCommon,
  "gryffindor common": gryffindorCommon,
  gryffindorcommon: gryffindorCommon,
  "common room": gryffindorCommon,
  library: library,
  greatHall: greatHall,
  greathall: greatHall,
  "great hall": greatHall,
  darkArtsClass: darkArtsClass,
  "dark arts": darkArtsClass,
  "dark arts class": darkArtsClass,
  darkartsclass: darkArtsClass,
  "dark arts classroom": darkArtsClass,
  classroom: darkArtsClass,
  chamberOfSecrets: chamberOfSecrets,
  "chamber of secrets": chamberOfSecrets,
  chamberofsecrets: chamberOfSecrets,
  roomOfRequirement: roomOfRequirement,
  "room of requirement": roomOfRequirement,
};

//directionkey

//---------------------------Items----------------------------//
class checkInventory {
  constructor(name, descriptionTxt, readTxt, greetTxt, takeable) {
    this.name = name; // name of the object
    this.descriptionTxt = descriptionTxt; // text about the object when player grabs it
    this.readTxt = readTxt; // text about the object when the player reads it
    this.greetTxt = greetTxt; // text about the object when the player greets it
    this.takeable = takeable;
  }
  examine() {
    return this.descriptionTxt;
  }
  read() {
    return this.readTxt;
  }

  greet() {
    return this.greetTxt;
  }

  take() {
    if (this.takeable) {
      player.inventory.push(this.name);
      return (
        "You have picked up the " + this.name + ", you have " + player.inventory
      );
    } else {
      return "You can't take the " + this.name;
    }
  }


    drop() {
  
      player.inventory.splice(player.inventory.indexOf(this.name), 1); // index,how many item to be removed
        console.log("you have " + player.inventory +"left in your inventory");
        //console.log(`still here 1`);
        return;
      }
 
  
}

let diary = new checkInventory(
  "diary",
  "When Tom Marvolo Riddle was in his fifth year at Hogwarts, he achieved his goal of locating Salazar Slytherin's Chamber of Secrets and used his ability to speak Parseltongue to open it. He further used this language ability to order the Chamber's Basilisk to terrorize the school and hunt down the Muggle-born students. Eventually one of the Muggle-borns, a Ravenclaw girl named Myrtle Warren, was killed. Riddle would later use this murder to infuse the journal with a piece of his soul, and transformed it into his first Horcrux.",
  "You open the diary to read the first page but AAAAAHHHHHHHH THE PAIN OF THE SCREECHING IS UNBEARABLE! You close it.",
  "This is the diary of Tom Riddle",
  true
);
let portrait = new checkInventory(
  "portrait of Godrick Gryffindor",
  "Godric Gryffindor valued courage, determination, chivalry, and strength of heart. Here his portrait lies as a memory of being one of the four most brilliant witches and wizards of his time.",
  "There are no words to read here!",
  "As a reminder, witches and wizards, the only way to fully extinguish a horcrux is to use basilisk venom or an object imbued with basilisk venom.",
  false
);
//should this be the "libraryScroll"
let scroll = new checkInventory(
  "scroll",
  "A scroll reads 'A brief history of the Room of Requirement'",
  "The room of requirement is reserved for those who are truly in need. In order to gain access, you must say 'I am in great need.' thrice",
  "You probably should not greet inanimate objects.",
  false
);
let cloak = new checkInventory(
  "Invisibility Cloak",
  `Aparecium! You reveal that the glimmering fabric is in fact the famous invisibility cloak! The cloak has been described as one which "endures eternally, giving constant and impenetrable concealment, no matter what spells are cast at it." According to the legend, Ignotus Peverell was given the cloak by Death in the 13th century as a reward for having bested him. Whether the legend is true or not, the cloak became a family heirloom and was inherited by Ignotus' descendents, including James Potter and eventually his son, Harry Potter who was given it as a gift on Christmas day 1991.`,
  "You cannot read the cloak!",
  "Hello cloak, hello player.",
  true
);
let treacleTart = new checkInventory(
  "Treacle Tart",
  "Hogwart's treacle tarts are made to perfection with a flakey pastry and golden syrup; and of course no soggy bottoms.",
  "You cannot read the treacle tart",
  "Not everything in Hogwarts is living...you can't greet a treacle tart.",
  true
);
let sortingHat = new checkInventory(
  "Sorting Hat",
  "\"Oh you may not think I'm pretty, but don't judge on what you see, I'll eat myself if you can find a smarter hat than me.\"",
  "You cannot read the Sorting Hat",
  "You can keep your bowlers black,\nYour top hats sleek and tall,\nFor I'm the Hogwarts Sorting Hat\nAnd I can cap them all.\nI have a clue for you - the answer to the castle lies in the Secret Chamber south of this Great Hall. To enter you must possess that which will make you invisible to those around you.",
  false
);
let potionBook = new checkInventory(
  "Advanced Potion-Making",
  "This Book is the Property of the Half-Blood Prince",
  "The pages of the book are written in and ripped.  The seam is falling apart.  You flip to a page with a recipe for Draught of Peace.  You bookmark to make for later.",
  "Everything this book has to say are contained within its pages.",
  true
);
let chalkBoard = new checkInventory(
  "chalk board",
  "The chalk board contains notes about Vanishing Cabinets.",
  'The scroll says, “Vanishing Cabinets were used regularly during the First Wizarding War to escape unseen if Death Eaters were to appear.  Used together with a second cabinet in an undisclosed location, a cabinet will transport a wizard away from their current location."',
  "The chalk board has said all that it can say.",
  false
);

let cup = new checkInventory(
  "House Cup",
  "Lucky for you the Basilisk has been dead for years - the glimmer appears to be a brilliant cup.  It appears to be the infamous House Cup! Maybe your house will win this year...",
  "",
  "",
  true
);

let mirror = new checkInventory(
  "mirror",
  "There is a message written in blood on the mirror.",
  "The mirror says “The Half-Blood Prince’s Advanced Potions book belongs in the room of requirement.”",
  "The mirror does not respond. It probably only speaks Parseltonge.",
  false
);

let cabinet = new checkInventory(
  "Vanishing Cabinet",
  "You are transporting to Borgin and Burkes, where many Death Eaters await you. Game over!",
  "The cabinet is void of words.",
  "I would not do that if I were you.",
  false
);

let basiliskFang = new checkInventory("Basilisk Fang", "", "", "", true);

let sword = new checkInventory(
  "Sword of Gryffindor",
  "This is the sword of Godrick Gryffindor! In Harry Potter’s first year at Hogwarts, he used it to kill the basilisk snake in the Chamber of Secrets!",
  "Just beneath the hilt of the sword, Godrick Gryffindor's name is engraved.",
  "You cannot greet the sword.",
  true
);

//items key
let itemKey = {
  treacletart: treacleTart,
  "treacle tart": treacleTart,
  tart: treacleTart,
  sortinghat: sortingHat,
  "sorting hat": sortingHat,
  hat: sortingHat,
  fabric: cloak,
  "invisibility cloak": cloak,
  cloak: cloak,
  "cloak of invisibility": cloak,
  diary: diary,
  "tom riddle's diary": diary,
  "riddle's diary": diary,
  "tom's diary": diary,
  "riddle diary": diary,
  "tom riddle diary": diary,
  portrait: portrait,
  potionbook: potionBook,
  book: potionBook,
  textbook: potionBook,
  "potion book": potionBook,
  "text book": potionBook,
  "half-blood prince book": potionBook,
  "halfblood prince book": potionBook,
  "half blood prince book": potionBook,
  scroll: scroll,
  "chalk board": chalkBoard,
  chalkboard: chalkBoard,
  cup: cup,
  "house cup": cup,
  housecup: cup,
  mirror: mirror,
  cabinet: cabinet,
  "vanishing cabinet": cabinet,
  vanishingcabinet: cabinet,
  sword: sword,
  "gryffindor sword": sword,
  "sword of gryffindor": sword,
  basiliskfang: basiliskFang,
  "basilisk fang": basiliskFang,
  fang: basiliskFang,
  inventory: player.inventory,
  north: "north",
  south: "south",
  east: "east",
  west: "west",
  around: "around",
};

//--------------------------------------------Actions---------------------------------------//
//action key
let listOfActions = {
  move: ["move", "travel", "go", "walk"],
  look: ["look", "scan", "survey", "view"],
  check: ["check"],
  take: ["take", "steal", "remove", "extract", "accio", "confiscate"],
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
  greet: ["greet", "address", "meet"],
};

//function to check player inventory
function checkPlayerInventory() {
  //if inventory is not empty prints out what is in inventory
  if (player.inventory.length > 0) {
    console.log(`You're inventory includes: ${player.inventory.join(", ")}`);
  }
  //if inventory is empty
  else {
    console.log(`You have nothing in your inventory.`);
  }
}

//drop function
//would like to drop an item
// yes
//which item
//1=diary, 2= scroll.....
//player inputs a number of the item to be dropped

 /*function drop(answerItem) {
  
player.inventory.splice(indexOf(answerItem), 1); // index,how many item to be removed
  console.log("you have " + player.inventory);
  //console.log(`still here 1`);
  return;
}*/

//drops inventory based on input
function dropInventory(item) {
  let index = player.inventory.indexOf(item);
  console.log(index); //finds item in player.inventory
  //removes from player.inventory
  //adds item to currentRoom.itemsInRoom
}

//state machine //Megan made this as a statehold

//----------------------------------------Functions-------------------------------//

//function to turn answer into array to isolate verb and noun
function splitAnswer(answer) {
  //declares answerArr variable as an array to hold the answer action and answer verb
  let answerArr = [];
  //creates an array of the available actions from listOfActions
  let actionKeys = Object.keys(listOfActions);
  //creates an array of the available items from the itemKey
  let itemKeys = Object.keys(itemKey);
  //the first part of the answer should be the action - compare the answer against the actionKey
  actionKeys.forEach((action) => {
    //for each action, there are multiple valid user inputs
    listOfActions[action].forEach((option) => {
      //if the user input is included in the listOfActions, return the valid action verb and store in answerArr[0]
      if (answer.includes(option)) {
        answerArr[0] = action;
      }
    });
    //for each item, if the item is included in the itemKey, return the valid item and store in asnwerArr1[]
    itemKeys.forEach((item) => {
      if (answer.includes(item)) {
        answerArr[1] = item;
      }
    });
  });
  //return answerArr
  return answerArr;
}

//confirms if the item being called upon is in the room the users is currently in
function checkRoom(item, currentRoom) {
  return items[mapOfItems[item]].currentRoom === currentRoom;
}

//checks the requirements for access for the locked rooms in the game
async function checkForAccess(room) {
  switch (room) {
    case "chamberOfSecrets":
      if (player.inventory.includes("cloak")) {
        roomKey[room].isUnlocked = true;
        break;
      } else {
        console.log("This room is locked!");
        break;
      }
    case "roomOfRequirement":
      console.log("you are trying to access the room of requirement");
      let password = await ask(
        "To enter this room you must say the magic words. If you know them please enter them now: "
      );
      if (password === "open.") {
        console.log("you've opened the room of requirement");
        roomKey[room].isUnlocked = true;
        roomOfRequirement.enter();
        break;
      } else {
        console.log("This room is locked!");
        break;
      }
  }
}

//----------------------Play game-------------------------------------------------//
start();
async function start() {
  //declares variable to store current room
  const welcomeMessage = `Welcome to Hogwarts, School of Witchcraft and Wizardry! Today you are tasked with a very important mission: find the remaining horcrux and destroy it as you move north, south, east, and west around the castle to defeat Voldemort once and for all! Are you ready to defeat Voldemort?\n>_`;
  let answer = await ask(welcomeMessage);
  while (answer.toLowerCase().trim() !== "yes") {
    answer = await ask('Say "yes" when you\'re ready to begin!\n>_');
  }
  //core of game - expects user input to move through rooms and interact with items.  Will continue to loop until the user enters 'exit'
  while (answer !== "exit") {
    //the user has said yes - show them the room description for the first room
    if (answer.toLowerCase().trim().includes("yes")) {
      player.currentRoom = greatHall;
      greatHall.enter();
    }

    //prompts user for input

    answer = await ask(">_");

    //sanitize answer
    answer = answer.toLowerCase().trim();

    //accepts answer and breaks out into action and noun
    let answerArr = splitAnswer(answer);
    //declares variables to hold the answerAction and answerItem
    let answerAction = answerArr[0];
    let answerItem = answerArr[1];

    //only if both answerAction and answerItem are defined will the the switch statement be triggered.  Otherwise the user input is not valid.

    //vet the direction against this array before entering move case
    let directionArray = ["north", "east", "south", "west"];

    if (answerAction && answerItem) {
      switch (answerAction) {
        case "move":
          player.currentRoom.move(answerItem);
          break;
        case "look":
          player.currentRoom.lookAround();
          break;
        case "drop":
          console.log(itemKey[answerItem].drop());
          break;
        //add item to current room
        case "check":
          checkPlayerInventory();
          break;
        case "examine":
          console.log(itemKey[answerItem].examine());
          break;
        case "read":
          console.log(itemKey[answerItem].read());
          break;
        case "greet":
          console.log(itemKey[answerItem].greet());
          break;
        case "take":
          console.log(itemKey[answerItem].take());
          //NEED(?): removes item from room
          break;
      }
    } else console.log(`Sorry, I don't know how to ${answer}.`);
  }
  console.log("Goodbye!");
  process.exit();
}
