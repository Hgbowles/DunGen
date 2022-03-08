/* 
Runner class for RanDungeon game
Runs a randomly generated dungeon following user input at points
*/

// imports for objects and prompt classes
const Enemy = require('./enemyClass.js');
const Player = require('./character.js');
const Room = require('./room.js');

const prompt = require('prompt-sync')();

// start the game
function main() {
   var playerX = 0;
   var playerY = 0;

   let map = [ // a 3x5 2-D array of rooms, the starting room at [0][0], all other rooms are randomly generated.
      [new Room("start", null, map[1][0], map[0][1], null), new Room(null, map[1][1], map[0][2], map[0][0]), new Room(null, map[1][2], null, map[0][1])],
      [new Room(map[0][0], map[2][0], map[1][1], null), new Room(map[0][1], map[2][1], map[1][2], map[1][0]), new Room(map[0][2], map[2][2], null, map[1][1])],
      [new Room(map[1][0], map[3][0], map[2][1], null), new Room(map[1][1], map[3][1], map[2][2], map[2][0]), new Room(map[1][2], map[3][2], null, map[2][1])],
      [new Room(map[2][0], map[3][0], map[3][1], null), new Room(map[2][1], map[4][1], map[3][2], map[3][0]), new Room(map[2][2], map[4][2], null, map[3][1])],
      [new Room(map[3][0], null, map[4][1], null), new Room(map[3][1], null, map[4][2], map[4][0]), new Room(map[3][2], null, null, map[4][1])]
   ]; 

// NEED TO IMPLEMENT BOSS AND KEY ROOM GENERATIONS


   let name = prompt("What is your name, adventurer, that we might know who you are when you achieve greatness? ");

   let pClass = prompt("What kind of adventurer are you? Are you a Mage, or are you a Knight? ");

   var hero;

   if (pClass.toLowerCase().trim() == "knight") {
      console.log("howdy");
      hero = new Player(name, 20, 13, 6);
   } else if (pClass.toLowerCase().trim() == "mage") {
    
      hero = new Player(name, 10, 10, 13);
   }

   console.log("Welcome, " + name + ", to RanDungeon, a randomly generated Dungeon Crawling Experience.\n");
   console.log("You may explore the dungeon in any method you like, and you may encounter a variety of different rooms and challenges.\n");
   console.log("You will start the dungeon with your standard adventuring equipment according to your class, as well as 3 health potions, just in case.\n");
   console.log("Now, adventurer, your destiny awaits! Enter the RanDungeon and emerge victorious!\n\n");

   // send adventurer to the start room

   

}

main();