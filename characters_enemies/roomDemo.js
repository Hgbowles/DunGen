const Room = require('./room.js');
const Hero = require('./character.js');
const prompt = require('prompt-sync')();
const Enemy = require('./enemyClass.js');


let adventurer = new Hero("Randall Peterson", 35, 15, 12);
let enemy = new Enemy("goblin", 3, 7, 1);

let dmap = [
   [null, null],
   [null, null]
];

dmap[0][0] = new Room(0, null, dmap[1][0], dmap[0][1], null);
dmap[1][0] = new Room(0.8, dmap[0][0], null, dmap[1][1], null);
dmap[0][1] = new Room(0.3, null, dmap[1][1], null, dmap[0][0]);
dmap[1][1] = new Room(0.5, dmap[0][1], null, null, dmap[1][0]);

var playX = 0;
var playY = 0;

let thisRoom = dmap[playY][playX];

thisRoom.state = false;
let gameEnd = false;
var moved = false;

// Begin the Demo
console.log("\nrunning Demo\n");

console.log("\n\nTo demonstrate the inventory system, the starting inventory of the player is: " + adventurer.inventory + "\n\n");

   while (!gameEnd) {
         if (!moved) {

            let move = prompt("Which way would you like to go? Enter a direction to enter that room. ");
            console.log("Previous Room coordinates: " + playX + ", " + playY);
            console.log("\n");

            if (move.toLowerCase().trim() == "south" && playY < dmap.length - 1){
               thisRoom = dmap[playY++][playX];
               moved = true;
               thisRoom.state = false;
            } else if (move.toLowerCase().trim() == "east" && playX < dmap[0].length - 1) {
               thisRoom = dmap[playY][playX++];
               moved = true;
               thisRoom.state = false;

            } else if (move.toLowerCase().trim() == "north" && playY > 0) {
               thisRoom = dmap[playY--][playX];
               moved = true;
               thisRoom.state = false;

            } else if (move.toLowerCase().trim() == "west" && playX > 0) {
               thisRoom = dmap[playY][playX--];
               moved = true;
               thisRoom.state = false;

            } else {
               console.log("Invalid movement direction, please try again.");
            }
            
         } else {
            thisRoom.generateRoom(adventurer, enemy);
            moved = false;
            thisRoom.state = true;
            if (dmap[0][0].state && dmap[0][1].state && dmap[1][0].state && dmap[1][1].state) {
               gameEnd = true;
            }
         }
         
      }

      console.log("\n\nTo demonstrate the inventory system, the final inventory of the player is: " + adventurer.inventory + "\n\n");

      console.log("\n\nI wish there was more here for you, now that you've finished this demo, but this is all I've got at the moment.\n");
      console.log("Don't worry, more will be out soon, by next week I want to start adding in the randomizers to the things, and try using the bigger map in runner.js.\n");
      console.log("But yeah that's the current demo for RanDungeon, your Randomized Dungeon Crawler Experience");

   


