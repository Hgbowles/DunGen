/*
Object class to generate rooms, with random enemies, treasure, and/or puzzles.
*/

const Enemy = require ('./enemyClass.js');
const prompt = require('prompt-sync')();

class dunRoom {

   

   constructor(special, north, south, east, west) { //special constructor, only occurs once per room type
      if (special == "key") {
         this.roomVal = 2;
      } else if (special == "boss") {
         this.roomVal = 3;
      } else if (special == "start") {
         this.roomVal = 0;
      } else {
         this.roomVal = special; // provide a Math.random() number
      }
      this.neighborN = north; //each room may have up to 4 neighbor rooms, but must have at least one neighbor.
      this.neighborS = south;
      this.neighborE = east;
      this.neighborW = west;
      this.state = false;
      //this.generateRoom();
   }

   getSouth(){
      return this.neighborS;
   }
   getEast(){
      return this.neighborE;
   }
   getNorth(){
      return this.neighborN;
   }
   getWest(){
      return this.neighborW;
   }

   generateRoom(hero, enemy) { // creates a room based on the roomVal
      this.state = false;

      console.log(this.roomVal);
      
      if (this.roomVal <= 0.3) {
         this.roomType = "treasure";
         this.treasureGen();
      } else if (this.roomVal <= 0.5) {
         this.roomType = "encounter";
         //this.combatGen(Math.random());
         this.combat(hero, enemy);
      } else if (this.roomVal <= 0.8) {
         this.roomType = "puzzle";
         this.puzzleTypeGen();
      } else if (this.roomVal == 0.9) {
         this.roomType = "library";
         this.libraryLootGen();
      } else if (this.roomVal == 1) {
         this.roomType = "armory";
         this.armoryLootGen();
      } else if (this.roomVal == 2) {
         this.roomType = "key";
         this.keyRoomGen();
      } else if (this.roomVal == 3) {
         this.roomType = "boss";
         this.bossRoomGen();
      }
   }

   puzzleTypeGen() {
      // generates a variety of simple puzzles/riddles to unlock the next rooms
      //let puzzleType = Math.random();

      let puzzleType = 0.3;

      if (puzzleType <= 0.3) {
         puzzleType = "riddle"; // there will be a pool of riddles chosen randomly, the player must answer correctly to pass (think like that part from The Hobbit)
         console.log("As you enter the next room, you see an inscription on the wall.\n");
         this.riddleGen();
      } else if (puzzleType <= 0.6) {
         puzzleType = "numbers"; // there will be some simple number game, the player must win to pass
      } else {
         puzzleType = "TBD"; // unsure what this part will be, likely either trivia or something simple like that.
      }
      
   }

   combatGen(enemyType) { // generates combat encounters

      var enemyWeight = 0;

      // generates the type of enemies for the room
      if (enemyType <= 0.4) {
         enemyWeight = 4;
         enemyType = "goblin";
      } else if (enemyType <= 0.6) {
         enemyWeight = 2;
         enemyType = "ogre";
      } else if (enemyType <= 0.8) {
         enemyWeight = 2
         enemyType = "giant spider";
      } else if (enemyType <= 1) {
         enemyWeight = 1;
         enemyType = "animated armor";
      } 


   }

   treasureGen() {
      // generates the treasure and value in the room
      // Treasure will have a score value, to increase a player's final score
      // Random number of chests, chests may be trapped (tripwire, Mimic, poison dart, etc.)

      let numChests = Math.round(Math.random() * 5);

      let numTrapped = Math.round(Math.random() * numChests);

      console.log("This room will be the treasure room, once an inventory is developed properly.\n");
      console.log("As for now, the room has " + numChests + " chests in it, and " + numTrapped + " of them are trapped.");

      console.log("for now, the room will say you have completed it, carry on.\n");



   }


   libraryLootGen() {
      // generates inventory loot for Mages (spell scrolls, potions, etc.)
   }

   armoryLootGen() {
      // generates inventory loot for Knights (weapons, armor, potions, etc.)
   }

   bossRoomGen() {
      console.log("As you enter the next room, you see before you a giant fire-breathing dragon atop a mountain of gold. It looks down at you and roars mightily.\n");
      console.log("I hope you're ready, adventurer. The dragon surely is.\n");
      let boss = new Enemy("dragon", 150, 17, 20);
      let bossTreasure = 50000;
   }

   combat(hero, monster) {
      var fled = false;
      while(hero.hp > 0 && monster.hp > 0) {
         let act = prompt("What will you do, hero? You can FIGHT, USE ITEM, or FLEE ");
            if (act.toLowerCase().trim() == "flee"){
               monster.hurt(1000);
               fled = true;
            } else {
      
               hero.action(act, monster);
      
               console.log("The " + monster.type + " attacks!");
               monster.attack(hero); 
            }      
      }
      if (fled) {
         console.log("You fled from the " + monster.type + ".\n");
         console.log("I mean, I guess that was always an option, but really?\n");
         console.log("Either way, the demo's over now, I guess.\n");
         console.log("Feel free to play again if you want.\n");
      } else if (hero.hp > 0){
         console.log("Congratulations, " + hero.name + "! You defeated the " + monster.type + "!\n");
         //console.log("To the winner go the spoils, you collect the gold from the dragon's hoard, about 50000 pieces in total.\n");
         //hero.addGold(50000);
         //console.log("Having defeated the mighty beast, you have completed the RanDungeon! Congratulations, " + hero.name + "! Feel free to play again for another unique RanDungeon experience!\n");
      } else if (hero.hp <= 0){
         console.log("Unfortunately, you were defeated by the " + monster.type + ".\n");
         console.log("If this were the full game, you would get a \"Game Over\" screen here and be sent back to the atart with character creation.\n");
         console.log("However, this is not a full game yet, so all you get is this message and a sense of defeat.\n");
      }
   }

   keyRoomGen() {
      //
      console.log("The room before you is almost completely empty.\n");
      console.log("All you can see is a single chest in the center of the room.\n");
      console.log("As you approach the chest, you find no traps, no monsters, nothing. The chest opens easily for you.\n");
      console.log("Inside the chest, you find a very ornate key with the design of a dragon.\n");
      console.log("You found the BOSS KEY!");

      hero.hasKey = true;
   }

   riddleGen() {
      let riddleNum = Math.floor(Math.random() * 4) + 1;
      var riddleText = "";
      var riddleAns = "";

      switch(riddleNum) {
         case 1:
            riddleText = "I have towns without people, forests without trees, and rivers without water. What am I?";
            riddleAns = "map";
            break;
         case 2:
            riddleText = "I am at the beginning of the end and the end of the before. What am I?";
            riddleAns = "e";
            break;
         case 3:
            riddleText = "The more of me you take, the more you leave behind. What am I?";
            riddleAns = "footsteps";
            break;
         case 4:
            riddleText = "Thirty white horses on a red hill. They tramp and they stamp, and then they stand still. What am I?";
            riddleAns = "teeth";
            break;
      }

      let solved = false;

      while (solved == false){

         console.log(riddleText);
         while (!solved) {
            var guess = prompt("It seems like a riddle... Try entering a guess here: ");
            if (guess.toLowerCase().trim() == riddleAns) {
               console.log("You hear a loud *thunk* as the doors swing open. It looks like you got it right!\n")
               solved = true;
            } else {
               console.log("Nothing happened... I don't think that was the right answer.\n");
            }
         }
      }  
   }



}

module.exports = dunRoom;