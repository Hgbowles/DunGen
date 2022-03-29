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
      [sRoom, room1, room2],
      [room3, room4, room5],
      [room6, room7, room8],
      [room9, room10, room11],
      [room12, room13, room14]
   ]; 

   let sRoom = new Room("start", null, map[1][0], map[0][1], null);
   let room1 = new Room(null, map[1][1], map[0][2], map[0][0]);
   let room2 = new Room(null, map[1][2], null, map[0][1]);
   let room3 = new Room(map[0][0], map[2][0], map[1][1], null);
   let room4 = new Room(map[0][1], map[2][1], map[1][2], map[1][0]);
   let room5 = new Room(map[0][2], map[2][2], null, map[1][1]);
   let room6 = new Room(map[1][0], map[3][0], map[2][1], null);
   let room7 = new Room(map[1][1], map[3][1], map[2][2], map[2][0]);
   let room8 = new Room(map[1][2], map[3][2], null, map[2][1])
   let room9 = new Room(map[2][0], map[3][0], map[3][1], null);
   let room10 = new Room(map[2][1], map[4][1], map[3][2], map[3][0]);
   let room11 = new Room(map[2][2], map[4][2], null, map[3][1]);
   let room12 = new Room(map[3][0], null, map[4][1], null);
   let room13 = new Room(map[3][1], null, map[4][2], map[4][0]);
   let room14 = new Room(map[3][2], null, null, map[4][1]);

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

   let currRoom = map[playerX][playerY];

   console.log("You find yourself in an empty room, with doors pointing east and south. \nThe doors are unlocked, but you are unable to see into either room without entering.\n");

   while (hero.hp > 0){
      let moved = false;

      while (moved == false) {
         if (currRoom.state == true) {

            let move = prompt("Which way would you like to go? Enter \"south\" or \"east\" to enter that room. ");

            if (move.toLowerCase().trim() == "south" && currRoom.getSouth() != null){
               currRoom = map[playerX++][playerY];
               moved = true;
            } else if (move.toLowerCase().trim() == "east" && currRoom.getEast() != null) {
               currRoom = map[playerX][playerY++];
               moved = true;
            } else if (move.toLowerCase().trim() == "north" && currRoom.getNorth() != null) {
               currRoom = map[playerX--][playerY];
               moved = true;
            } else if (move.toLowerCase().trim() == "west" && currRoom.getWest() != null) {
               currRoom = map[playerX][playerY--];
               moved = true;
            } else {
               console.log("Invalid movement direction, please try again.");
            }
         } else {
            console.log("It seems that the doors won't open yet, maybe there's something left to do here?");
         }
      }

      currRoom.generateRoom();





   }

}

main();