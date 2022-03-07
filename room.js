/*
Object class to generate rooms, with random enemies, treasure, and/or puzzles.
*/

class dunRoom {

   constructor(){ // basic constructor, randomly generates room values
      this.roomVal = Math.random();

      this.roomType = "base";
   }

   constructor(special) { //special constructor, only occurs once per room type
      if (special == "key") {
         this.roomVal = 2;
      } else if (special == "boss") {
         this.roomVal = 3;
      }
   }

   generateRoom() { // creates a room based on the roomVal
      if (this.roomVal == 0) {
         this.roomType = "start";
      } else if (this.roomVal <= 0.3) {
         this.roomType = "treasure";
      } else if (this.roomVal <= 0.5) {
         this.roomType = "encounter";
      } else if (this.roomVal <= 0.8) {
         this.roomType = "puzzle";
      } else if (this.roomVal == 0.9) {
         this.roomType = "library";
      } else if (this.roomVal == 1) {
         this.roomType = "armory";
      } else if (this.roomVal == 2) {
         this.roomType = "key";
      } else if (this.roomVal == 3) {
         this.roomType = "boss";
      }
   }

   puzzleTypeGen() {
      // generates a variety of simple puzzles/riddles to unlock the next rooms
      let puzzleType = Math.random();

      if (puzzleType <= 0.3) {
         puzzleType = "riddle"; // there will be a pool of riddles chosen randomly, the player must answer correctly to pass (think like that part from The Hobbit)
      } else if (puzzleType <= 0.6) {
         puzzleType = "numbers"; // there will be some simple number game, the player must win to pass
      } else {
         puzzleType = "trivia?"; // unsure what this part will be, likely either trivia or something simple like that.
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

      // generate the number of enemies in the room
      var numEnemies = Math.round(Math.random() * enemyWeight);

   }

   treasureGen() {
      // generates the treasure and value in the room
      // Treasure will have a score value, to increase a player's final score
      // Random number of chests, chests may be trapped (tripwire, Mimic, poison dart, etc.)

      let numChests = Math.round(Math.random() * 5);

      let numTrapped = Math.round(Math.random() * numChests);



   }


   libraryLootGen() {
      // generates inventory loot for Mages (spell scrolls, potions, etc.)
   }

   armoryLootGen() {
      // generates inventory loot for Knights (weapons, armor, potions, etc.)
   }

   bossRoomGen() {
      let bossType = "dragon";
      let bossTreasure = 50000;
   }

   keyRoomGen() {
      //
      let numChests = 1;
   }

   riddleGen() {
      let riddleNum = Math.round(Math.random() * 4);
      var riddleText = "";
      var riddleAns = "";

      switch(riddleNum) {
         case 1:
            riddleText = "I have towns without people, forests without trees, and rivers without water. What am I?";
            riddleAns = "map";
         case 2:
            riddleText = "I am at the beginning of the end and the end of the before. What am I?";
            riddleAns = "e";
         case 3:
            riddleText = "The more of me you take, the more you leave behind. What am I?";
            riddleAns = "footsteps";
         case 4:
            riddleText = "Thirty white horses on a red hill. They tramp and they stamp, and then they stand still. What am I?";
            riddleAns = "teeth";
      }
   }



}

module.exports = dunRoom;