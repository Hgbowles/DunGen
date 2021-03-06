/* 
Runner class for RanDungeon game
Runs a randomly generated dungeon following user input at points
*/

// imports for objects and prompt classes
const Enemy = require('./enemyClass.js');
const Player = require('./character.js');
const Room = require('./room.js');

const prompt = require('prompt-sync')();

// helper method to build room objects after checkign for boss/key rooms

function buildRoom(roomNum, keyIn, bossIn, n, s, e, w) {

   var buildVal;

   switch(roomNum) { // compares room numbers to the special values
      case keyIn:
         buildVal = 2;
         break;
      case bossIn:
         buildVal = 3;
         break;
      default:
         buildVal = Math.random();
         break;
   }
   return new Room(buildVal, n, s, e, w); //returns a new room object
}

// start the game
function main() {
   var playerX = 0;
   var playerY = 0;

   let map = [ // a 3x5 2-D array of rooms, the starting room at [0][0], all other rooms are randomly generated.
      [null, null, null],
      [null, null, null],
      [null, null, null]
      // [null, null, null],
      // [null, null, null]
   ]; 

   var bossRoom = Math.round((Math.random() * 10) % 8); // randomly generate locations for boss and key
   var keyRoom = Math.round((Math.random() * 10) % 8);
   while (keyRoom == bossRoom) {
      keyRoom = Math.round((Math.random() * 10) % 8);  // make sure the boss and key room are different rooms
   }

   console.log(keyRoom);
   console.log(bossRoom);

   // build the rooms, I'll have to implement checks for boss and key rooms, as well as lock the boss room until the player has the key
   // that will be for next week
   // all other rooms will be generated by Math.random()

   map[0][0] = new Room("start", null, map[1][0], map[0][1], null);
   map[0][1] = buildRoom(0, keyRoom, bossRoom, null, map[1][1], map[0][2], map[0][0]);
   map[0][2] = buildRoom(1, keyRoom, bossRoom, null, map[1][2], null, map[0][1]);
   map[1][0] = buildRoom(2, keyRoom, bossRoom, map[0][0], map[2][0], map[1][1], null);
   map[1][1] = buildRoom(3, keyRoom, bossRoom, map[0][1], map[2][1], map[1][2], map[1][0]);
   map[1][2] = buildRoom(4, keyRoom, bossRoom, map[0][2], map[2][2], null, map[1][1]);
   map[2][0] = buildRoom(5, keyRoom, bossRoom, map[1][0], null, map[2][1], null);
   map[2][1] = buildRoom(6, keyRoom, bossRoom, map[1][1], null, map[2][2], map[2][0]);
   map[2][2] = buildRoom(7, keyRoom, bossRoom, map[1][2], null, null, map[2][1])
   // map[3][0] = buildRoom(8, keyRoom, bossRoom, map[2][0], map[3][0], map[3][1], null);
   // map[3][1] = buildRoom(9, keyRoom, bossRoom, map[2][1], map[4][1], map[3][2], map[3][0]);
   // map[3][2] = buildRoom(10, keyRoom, bossRoom, map[2][2], map[4][2], null, map[3][1]);
   // map[4][0] = buildRoom(11, keyRoom, bossRoom, map[3][0], null, map[4][1], null);
   // map[4][1] = buildRoom(12, keyRoom, bossRoom, map[3][1], null, map[4][2], map[4][0]);
   // map[4][2] = buildRoom(13, keyRoom, bossRoom, map[3][2], null, null, map[4][1]);

   let name = prompt("What is your name, adventurer, that we might know who you are when you achieve greatness? ");

   var hero;
   var enemy;
   var pClass;

   do {

      pClass = prompt("What kind of adventurer are you? Are you a Mage, or are you a Knight? ");

   

      if (pClass.toLowerCase().trim() == "knight") {
         hero = new Player(name, "knight", 20, 14, 10);
      } else if (pClass.toLowerCase().trim() == "mage") {
         hero = new Player(name, "mage", 15, 10, 20);
      } else {
         console.log("Sorry, I don't think that's one of the options for a class. try again.")
   }

} while (pClass.toLowerCase().trim() != "knight" && pClass.toLowerCase().trim() != "mage")

   console.log("Welcome, " + name + ", to DunGen, a randomly generated Dungeon Crawling Experience.\n");
   console.log("You may explore the dungeon in any method you like, and you may encounter a variety of different rooms and challenges.\n");
   console.log("You will start the dungeon with your standard adventuring equipment according to your class, as well as 3 health potions and an antidote, just in case.\n");
   console.log("Now, adventurer, your destiny awaits! Enter the Dungeon and emerge victorious!\n\n");

   // send adventurer to the start room

   var moved = true;
   let gameEnd = false;
   //map[playerX][playerY].state = false;

   console.log("You find yourself in an empty room, with doors pointing east and south. \nThe doors are unlocked, but you are unable to see into either room without entering.\n");

   do {
         if (!moved) {

            let move = prompt("Which way would you like to go? Enter a direction to enter that room. You can also check the map if you want by entering \"MAP\", or \"USE ITEM\" to access the inventory and heal or cure poison. " );
            console.log(move);

            if (move.toLowerCase().trim() == "south" && playerY < map[0].length){
               if (map[playerY][playerX + 1].isBoss) {
                  if (hero.hasKey) {
                     playerX++;
                     moved = true;
                  }  else {
                     console.log("This door seems locked. It looks like you need a key.\n");
                  }
               } else {
                  playerX++;
                  moved = true;
               }
            } else if (move.toLowerCase().trim() == "east" && playerX < map.length) {
               if (map[playerY + 1][playerX].isBoss) {
                  if (hero.hasKey) {
                     playerY++;
                     moved = true;
                  } else {
                     console.log("This door seems locked. It looks like you need a key.\n");
                  }
               } else {
                  playerY++;
                  moved = true;
               }
            } else if (move.toLowerCase().trim() == "north" && playerY > 0) {
               if (map[playerY][playerX - 1].isBoss) {
                  if (hero.hasKey) {
                     playerX--;
                     moved = true;
                  } else {
                     console.log("This door seems locked. It looks like you need a key.\n");
                  }
               } else {
                  playerX--;
                  moved = true;
               }
            } else if (move.toLowerCase().trim() == "west" && playerX > 0) {
               if (map[playerY - 1][playerX].isBoss) {
                  if (hero.hasKey) {
                     playerY--;
                     moved = true;
                  } else {
                     console.log("This door seems locked. It looks like you need a key.\n");
                  }
               } else {
                  playerY--;
                  moved = true;
               }
            } else if (move.toLowerCase().trim() == "map") {
               var mapString = "";
               for (let i = 0; i < map.length; i++) {
                  for (let j = 0; j < map[0].length; j++) {
                     if (playerX == i && playerY == j) {
                        mapString += "[X]";
                     } else {
                        mapString += "[ ]";
                     }
                  }
                  mapString += "\n";
               }
               console.log(mapString);
               console.log("\nX = You Are Here");
            }  else if (move.toLowerCase().trim() == "use item") {
               console.log("Which item will you use? ");
               itemName = prompt("You currently have " + hero.numHeal + " HEALTH POTIONs and " + hero.numAnt + " ANTIDOTEs.");
               switch(itemName.toLowerCase().trim()) {
                  case 'health potion':
                     if (hero.numHeal > 0) {
                        hero.heal(10);
                        hero.numHeal--;
                     } else {
                        console.log("Sorry, you don't have any of those.");
                     }
                  case 'antidote':
                     if (hero.numAnt > 0) {
                        hero.setCon(null);
                        hero.numAnt--;
                     } else {
                        console.log("Sorry, you don't have any of those.");
                     }
               }
            } else {
               console.log("Invalid input, please try again.");
            }
         
         } else {
            if (map[playerX][playerY].state == false) {
               map[playerX][playerY].generateRoom(hero, enemy);
               map[playerX][playerY].state = true;
               if (map[playerX][playerY].fled) {
                  switch(move.toLowerCase().trim()) {
                     case "south":
                        playerX--;
                        break;
                     case "north":
                        playerX++;
                        break;
                     case "east":
                        playerY--;
                        break;
                     case "west":
                        playerY++;
                        break;
                  }
               }
            }
            moved = false;
            console.log(playerY);

         }

         if (hero.condition == 'poison') {
            hero.hurt(1);
            console.log("You feel the poison slowly draining your energy. You should find an antidote soon.");
         }
   }    while (hero.hp > 0 && !gameEnd);
}

main();