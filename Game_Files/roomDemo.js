const Room = require('./room.js');
const Hero = require('./character.js');
const prompt = require('prompt-sync')();
const Enemy = require('./enemyClass.js');


let adventurer = new Hero("Randall Peterson","knight", 35, 15, 12);
let enemy = new Enemy("goblin", 3, 7, 1);

let dmap = [
   [null, null],
   [null, null]
];

dmap[0][0] = new Room("start", null, dmap[1][0], dmap[0][1], null);
dmap[1][0] = new Room(0.8, dmap[0][0], null, dmap[1][1], null);
dmap[0][1] = new Room(0.9, null, dmap[1][1], null, dmap[0][0]);
dmap[1][1] = new Room(1, dmap[0][1], null, null, dmap[1][0]);

var playX = 0;
var playY = 0;

dmap[playX][playY].state = false;
let gameEnd = false;
var moved = true;

// Begin the Demo
console.log("\nrunning Demo\n");

console.log("\n\nTo demonstrate the character upgrade system, the starting armor and hp of the player is: " + adventurer.armor + " and " + adventurer.hp + "\n\n");
   //thisRoom.generateRoom(adventurer, enemy);
   // while (!gameEnd) {
      do {
         if (!moved) {

            let move = prompt("Which way would you like to go? Enter a direction to enter that room. ");
            console.log("Previous Room coordinates: " + playX + ", " + playY);
            console.log("\n");

            if (move.toLowerCase().trim() == "south" && playY < dmap.length - 1){
               playY++;;
               moved = true;
               dmap[playX][playY].state = false;
            } else if (move.toLowerCase().trim() == "east" && playX < dmap[0].length - 1) {
               playX++;;
               moved = true;
               dmap[playX][playY].state = false;

            } else if (move.toLowerCase().trim() == "north" && playY > 0) {
               playY--;;
               moved = true;
               dmap[playX][playY].state = false;

            } else if (move.toLowerCase().trim() == "west" && playX > 0) {
               playX--;;
               moved = true;
               dmap[playX][playY].state = false;

            } else {
               console.log("Invalid movement direction, please try again.");
            }

            //console.log("current room: "+ playX + ", " + playY);
            
         } else {
            //console.log("current room: "+ playX + ", " + playY);

            dmap[playX][playY].generateRoom(adventurer, enemy);
            moved = false;
            dmap[playX][playY].state = true;
         }

            gameEnd = dmap[0][0].state == true && dmap[0][1].state == true && dmap[1][0].state == true && dmap[1][1].state == true;
         
      } while (!gameEnd);
      
      console.log("\n\nTo demonstrate the character upgrade system, the final armor and hp of the player is: " + adventurer.armor + " and " + adventurer.hp + "\n\n");

      console.log("\n\nI wish there was more here for you, now that you've finished this demo, but this is all I've got at the moment.\n");
      console.log("Don't worry, more will be out soon, by next week I want to start adding in the randomizers to the things, and try using the bigger map in runner.js.\n");
      console.log("But yeah that's the current demo for DunGen, your Randomized Dungeon Crawler Experience");

   


