import "./App.css";
import Header from "./components/Header.js";
import PlayContainer from "./components/PlayContainer.js";
import { useState } from "react";

function App() {
  //------------------------------Items------------------------------//
  //defines a class of items - constructors include
  // - name (full name of the item)
  // - descriptionTxt (text about the object when the player interacts with it)
  // - readTxt (text about the object when the player reads it)
  // - greetTxt (text about the object when the player greets it)
  // - takeable (boolean indicating if the object is takable or not)
  class checkInventory {
    constructor(name, descriptionTxt, readTxt, greetTxt, takeable) {
      this.name = name;
      this.descriptionTxt = descriptionTxt;
      this.readTxt = readTxt;
      this.greetTxt = greetTxt;
      this.takeable = takeable;
    }
    examine() {
      setDetails(this.descriptionTxt);
    }
    read() {
      setDetails(this.readTxt);
    }

    greet() {
      setDetails(this.greetTxt);
    }

    putOn(player) {
      // checks if the item being put on is the sorting hat
      if (this.name === "Sorting Hat") {
        // if the player house is not yet set, the hat will randomly sort the user into a house
        console.log("inside put on function player is", player);
        if (player.house === "") {
          let houseArray = [
            "Gryffindor",
            "Slytherin",
            "Hufflepuff",
            "Ravenclaw",
          ];

          // choses a random number between 0 and 3, which correspond to indices of houses in houseArra
          let chosenHouse = houseArray[Math.round(3 * Math.random())];

          // sorting hat's response with chosen house
          setDetails(
            `Welcome, welcome, one and all
        the show is about to start
        I'm the Hogwarts Sorting Hat
        and it's time to play my part
        You may call me worn and ragged
        if that's all you truly see
        But listen close and I will tell
        where you're supposed to be!
        Go ahead and try me on
        there's nothing left to fear
        I'll find right where you belong
        by looking between your ears!
  
        .....
  
        ${chosenHouse}!`
          );

          // sets the house in player object
          player.house = chosenHouse;
        }
        // if the player has already been sorted the hat reminds them of their house
        else {
          setDetails(`You have already been sorted into ${player.house}.`);
        }
      }
      // checks if the item being put on is the cloak
      else if (this.name === "Invisibility Cloak") {
        // if the cloak is in the player's inventory they can wear it
        if (player.inventory.includes("Invisibility Cloak")) {
          setDetails("You're invisible!");
        }
        // the cloak must be in the player's inventory before they can wear it
        else {
          setDetails(
            "The cloak needs to be in your inventory before you can wear it."
          );
        }
      }
      // no other items can be worn
      else setDetails("You can't wear the " + this.name + ".");
    }

    take(player) {
      //checks that the item requested is in the player's current room
      if (player.currentRoom.itemsInRoom.includes(this.name)) {
        //checks that the item is takable
        if (this.takeable) {
          // adds item to players inventory array
          player.inventory.push(this.name);
          setPlayer(player);

          // removes item from current room
          player.currentRoom.itemsInRoom.splice(
            player.currentRoom.itemsInRoom.indexOf(this.name),
            1
          );

          // return message to player
          setDetails("You have picked up the " + this.name + ".");
        }
        // if item is not takable
        else {
          setDetails("You can't take the " + this.name + ".");
        }
      }
      // if the item is not in the same room returns that the item is not there
      else {
        setDetails("The " + this.name + " is not here.");
      }
    }

    drop(player) {
      //removes item from player inventory
      player.inventory.splice(player.inventory.indexOf(this.name), 1); // index,how many item to be removed
      setDetails(`You have dropped the ${this.name}.`);

      // adds item to the current room
      player.currentRoom.itemsInRoom.push(this.name);

      // lets the player know what is left in their inventory
      if (player.inventory.length > 0) {
        setDetails(
          "You have " + player.inventory.join(", ") + " left in your inventory."
        );
      } else setDetails("You have nothing in your inventory.");
    }
  }

  //declares each of the rooms
  let diary = new checkInventory(
    "Tom Riddle's Diary",
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

  let scroll = new checkInventory(
    "scroll",
    "A scroll reads 'A brief history of the Room of Requirement'",
    `The room of requirement is reserved for those who are truly in need. In order to gain access, you need to walk by the room three times in great need, or say "open open open" with the direction which you are facing`,
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
    "\"Oh you may not think I'm pretty,\nbut don't judge on what you see,\nI'll eat myself if you can find a smarter hat than me.\"",
    "You cannot read the Sorting Hat.",
    '"You can keep your bowlers black,\nYour top hats sleek and tall,\nFor I\'m the Hogwarts Sorting Hat\nAnd I can cap them all."\nI have a clue for you - the answer to the castle lies in the Secret Chamber south of this Great Hall. To enter you must possess that which will make you invisible to those around you.',
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
    "The House Cup does not have anything to say.",
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

  let basiliskFang = new checkInventory(
    "Basilisk Fang",
    "The Basilisk, also known as the King of Serpents, is a deadly beast who can kill someone with a single look directly into its piercing eyes. Its venom has only one known antidote: the tears of a phoenix.",
    "There is nothing to read on the Basilisk Fang.",
    "Better you than me - I would have no interest in greeting a Basilisk Fang!",
    true
  );

  let sword = new checkInventory(
    "Sword of Gryffindor",
    "This is the sword of Godrick Gryffindor! In Harry Potter’s first year at Hogwarts, he used it to kill the basilisk snake in the Chamber of Secrets!",
    "Just beneath the hilt of the sword, Godrick Gryffindor's name is engraved.",
    "You cannot greet the sword.",
    true
  );

  //------------------------------Rooms------------------------------//
  //defines a class of Rooms - constructors include
  // - isUnlocked (boolean)
  // - roomDescription (printed when room is entered)
  // - itemsinRoom (room inventory)
  // - north/south/east/west (what rooms lie in each direction - false indicates that there is no room in that direction)
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

    //function to move a character into a new room
    move(answerItem, player) {
      console.log("BUG: inside move function player is", player);

      //declares a variable to hold the direction the user wants to move
      let direction = answerItem;
      //declares a variable that holds what the target room is based on the directional properties in the current room
      let newRoom = roomKey[this[direction]];
      //if there is a value in the requested direction from the current room is true, there is a room that can be entered
      if (this[direction]) {
        //if a new room is locked, checks unlock conditions for access
        if (!newRoom.isUnlocked) {
          //check if unlock conditions are met for the currently locked room
          if (
            newRoom === chamberOfSecrets &&
            player.inventory.includes("Invisibility Cloak")
          ) {
            newRoom.isUnlocked = true;
            this.move(answerItem, player);
          } else {
            setDetails("This room is locked! What is the password?");
          }
        }

        //checks if the new room is locked by accessing the isUnlocked property of the new room
        else if (newRoom.isUnlocked) {
          // resets details
          setDetails("");

          //if the room is unlocked, enter the new room and change the player's current room property to the new room
          player.currentRoom = newRoom;

          //when entering a new room, the room description method is accessed which prints the room description
          setDescription(newRoom.roomDescription);
        }
      }
      //if the value of the requested direction from the current room is false, the player cannot move in that direction
      else {
        setDetails(
          "You've encountered Filch who carries deep disdain in his heart for wandering students. You can't go this way!"
        );
      }
    }

    //look around the room and see the room's inventory:
    lookAround() {
      let currentItems = this.itemsInRoom;
      setDetails(`You look around and you see ${currentItems.join(", ")}`);
    }
  }
  //declares each of the rooms
  let greatHall = new Room(
    true,
    "Welcome to the Great Hall! It is filled with students feasting on many treats, including your favorite- treacle tarts! In the distance you see Professor McGonagall with the Sorting Hat.",
    [treacleTart.name, sortingHat.name],
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
  The fire is roaring and the students are lounging. You overhear bits of conversations among the past heads of Gryffindor (all the way back to Godrick Gryffindor), as they appear and vanish in their portrait frames that line the walls. You see a glimmering fabric in the corner of the room.`,
    [cloak.name, portrait.name],
    false,
    "library",
    "greatHall",
    false
  );

  let library = new Room(
    true,
    `Welcome to the Hogwarts library, where tens of thousands of books on thousands of shelves.`,
    [scroll.name, diary.name],
    false,
    false,
    "darkArtsClass",
    "gryffindorCommon"
  );

  let darkArtsClass = new Room(
    true,
    `You are now in the Defense Against the Dark Arts classroom.  Who is teaching this year?  You really shouldn’t bother figuring out, they’ll be gone before too long….
  Several rows of desks line the classroom, the professor’s desk is cluttered with copies of Advanced Potion-Making and scrolls.`,
    [chalkBoard.name, potionBook.name],
    "library",
    false,
    "roomOfRequirement",
    "greatHall"
  );

  let chamberOfSecrets = new Room(
    false,
    ` Enemies of the Heir, beware! The Chamber of Secrets has been opened! You are standing in a large pipe at the entrance to the Chamber. In front of you is the decaying skeleton of the Basilisk.  Near its giant head you see a glimmer of light.`,
    [mirror.name, cup.name],
    "greatHall",
    "roomOfRequirement",
    false,
    false
  );

  let roomOfRequirement = new Room(
    false,
    `Welcome to the Room of Requirement! As Dobby describes it to Harry Potter, “It is a room that a person can only enter when they have real need of it. Sometimes it is there, and sometimes it is not, but when it appears, it is always equipped for the seeker's needs."  You look around and notice many items left by other students who were once in need.`,
    [cabinet.name, sword.name, basiliskFang.name],
    "darkArtsClass",
    false,
    false,
    "chamberOfSecrets"
  );

  //------------------------------State------------------------------//
  // player
  const [player, setPlayer] = useState({
    name: "Player1",
    inventory: [],
    currentRoom: "",
    house: "",
  });

  // sets game description to be displayed
  const [
    description,
    setDescription,
  ] = useState(`Welcome to Hogwarts, School of Witchcraft and Wizardry! Today you are
  tasked with a very important mission to find one remaining horcrux and
  destroy it.`);

  // sets game details, which show below room description to player
  const [
    details,
    setDetails,
  ] = useState(`To play, click "Enter". Then enter commands to move about the castle like "move north" or "move south". Interact with objects with commands like "examine", "greet", "read" or "take", for example "greet hat". Move about the castle and interact with enchanted objects to defeat Voldemort once and for all!`);

  // item key - given a string input maps to the corresponding item object
  const [itemKey, setItemKey] = useState({
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
    room: "roomOfRequirement",
  });

  // room key - given a string input maps to the corresponding room object
  const [roomKey, setRoomKey] = useState({
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
  });

  //confirms if the item being called upon is in the room the users is currently in
  function checkWin() {
    if (
      player.currentRoom === roomKey["chamberOfSecrets"] &&
      player.inventory.includes(diary.name)
    ) {
      if (
        player.inventory.includes(sword.name) ||
        player.inventory.includes(basiliskFang.name)
      ) {
        setDescription("Congratulations. You Win!");
        setDetails(
          "You are in the Chamber of Secrets. Tom Riddle's Diary does not stand a chance now that you have the proper tools to destroy it. As the last horcrux to destroy you have now completed your quest to vanquish Lord Voldemort once and for all.  You are indeed The Chose One."
        );
      }
    }
  }

  //checks the lose conditions
  function checkLose(action, item) {
    if (action === "examine" && item === "cabinet") {
      setDescription("You lose");
    }
  }

  // begins game when ENTER is clicked
  function startGame() {
    setDescription(greatHall.roomDescription);
    setDetails("");
    setPlayer({ ...player, currentRoom: greatHall });
  }

  // play function - triggered whenever a user input is submitted
  function playerMove(answerAction, answerItem) {
    //only if both answerAction and answerItem are defined will the the switch statement be triggered.  Otherwise the user input is not valid
    if (answerAction && answerItem) {
      console.log("inside answer if statement", answerAction, answerItem);
      //switch statement looks at answerAction and triggers the appropriate case based on input
      switch (answerAction) {
        case "move": //WORKING IN REACT
          player.currentRoom.move(answerItem, player);
          break;

        //unlock is triggered to open the roomOfRequirement, we want to change the current room to whichever room belongs to the desired direction key, then use our move function to move into the room
        case "unlock":
          // currentRoom = player.currentRoom;
          //since answer item is direction, currentRoom[answerItem] is identify what room you're moving too: in this case it's the roomOfRequirement
          let newRoom = roomKey[player.currentRoom[answerItem]];
          //keeps new room unlocked
          newRoom.isUnlocked = true;
          player.currentRoom.move(answerItem, player);
          break;

        //if answerAction is look - trigger lookAround method
        case "look": //WORKING IN REACT
          player.currentRoom.lookAround();
          break;

        //if answerAction is drop - trigger drop method
        case "drop":
          //calls the drop method on the item class
          itemKey[answerItem].drop(player);
          break;

        // if answerAction is examine - trigger examine method
        case "examine": //WORKING IN REACT
          itemKey[answerItem].examine();
          break;

        // if answerAction is read - trigger read method
        case "read": //WORKING IN REACT
          itemKey[answerItem].read();
          break;

        // if answerAction is greet - trigger greet method
        case "greet": //WORKING IN REACT
          itemKey[answerItem].greet();
          break;

        // if answerAction is puton - trigger puton method
        case "putOn": //WORKING IN REACT
          itemKey[answerItem].putOn(player);
          break;

        // if answerAction is take - trigger take method
        case "take": //WORKING IN REACT
          // adds item to inventory if item is takeable and in the current room
          itemKey[answerItem].take(player);
          break;
      }
      //check win and lose conditions
      checkWin();
      checkLose(answerAction, answerItem);
    }
    //if answerAction and answerItem are not both defined
    else setDetails(`Sorry, I don't know how to do that.`);
  }

  console.log("player is", player);

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <PlayContainer
          player={player}
          setPlayer={setPlayer}
          itemKey={itemKey}
          description={description}
          startGame={startGame}
          playerMove={playerMove}
          details={details}
          setDetails={setDetails}
        />
      </header>
    </div>
  );
}

export default App;
