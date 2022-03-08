/* 
Runner class for RanDungeon game
Runs a randomly generated dungeon following user input at points
*/

// imports for objects and prompt classes
const Enemy = require('./enemyClass.js');
const Player = require('./character.js');
const Room = require('./room.js');

const prompt = require('prompt-sync')();





// start the demo
function main() {

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

   // include files found in characters_enemies

   //import {main} from './demo.js';

   //main();

   

}

main();