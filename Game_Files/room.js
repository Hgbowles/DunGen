/*
Object class to generate rooms, with random enemies, treasure, and/or puzzles.
*/

const Chest = require('./chest.js');
const Enemy = require ('./enemyClass.js');
const prompt = require('prompt-sync')();

class dunRoom {

   

   constructor(special, north, south, east, west) { //special constructor, only occurs once per room type
      this.roomVal = special;
      this.neighborN = north; //each room may have up to 4 neighbor rooms, but must have at least one neighbor.
      this.neighborS = south;
      this.neighborE = east;
      this.neighborW = west;
      this.state = (special == "start");

      this.isBoss = (special == 3);

      this.easy = 0.5;
      this.medium = 0.9;
      this.hard = 1;
      this.fled = false;
      
   }

   getVal() {
      return this.roomVal;
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

   generateEnemy() {
      let genVal = Math.random();
      if (genVal <= this.easy) {
         //goblin
         this.enemy = new Enemy("goblin", 7, 10, 5);
      } else if (genVal <= this.medium) {
         //bugbear
         this.enemy = new Enemy("bugbear", 27, 13, 11);
      } else {
         //"hard", Minotaur
         this.enemy = new Enemy("minotaur", 76, 14, 17);
      }
   }

   generateRoom(hero, enemy) { // creates a room based on the roomVal
      this.state = false;
      
      if (this.roomVal <= 0.3) {
         this.roomType = "treasure";
         this.treasureGen(hero);
      } else if (this.roomVal <= 0.5) {
         this.roomType = "encounter";
         this.generateEnemy();
         this.combat(hero, this.enemy);
      } else if (this.roomVal <= 0.8) {
         this.roomType = "puzzle";
         this.puzzleTypeGen();
      } else if (this.roomVal == 0.9) {
         this.roomType = "library";
         this.libraryLootGen(hero);
      } else if (this.roomVal == 1) {
         this.roomType = "armory";
         this.armoryLootGen(hero);
      } else if (this.roomVal == 2) {
         this.roomType = "key";
         this.keyRoomGen(hero);
      } else if (this.roomVal == 3) {
         this.roomType = "boss";
         this.bossRoomGen(hero);
      } else if (this.roomVal == "start") {
         this.startRoomGen();
      }
   }

   startRoomGen() {
      this.state = true;
      console.log("There doesn't appear to be anything special in this room, it's just the entrance to the dungeon.\n");
   }

   puzzleTypeGen() {
      // generates a variety of simple puzzles/riddles to unlock the next rooms

      let puzzleType = Math.random();

      if (puzzleType <= 0.5) {
         puzzleType = "riddle"; // there will be a pool of riddles chosen randomly, the player must answer correctly to pass (think like that part from The Hobbit)
         console.log("As you enter the next room, you see an inscription on the wall.\n");
         this.riddleGen();
      } else if (puzzleType <= 1) {
         puzzleType = "numbers"; // there will be some simple number game, the player must win to pass
         this.numGameGen();
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

   treasureGen(hero) {
      // generates the treasure and value in the room
      // Treasure will have a score value, to increase a player's final score
      // Random number of chests, chests may be trapped (tripwire, Mimic, poison dart, etc.)

      let numChests = Math.round(Math.random() * 5);
      var curChest;

      let numTrapped = Math.round(Math.random()) * numChests;
      let numSafe = numChests - numTrapped;

      console.log("You enter a room with some chests...\n");
      console.log("As for now, the room has " + numChests + " chests in it.\n");
      var action = '';
      while (action.toLowerCase().trim() != 'exit' && numChests > 0) {
         action = prompt("What would you like to do? Will you [SEARCH] the chests or [EXIT] the room? ");
         if (action.toLowerCase().trim() == 'search') {
            let chestVal = Math.round((Math.random() * 10) % 2);

            if (chestVal == 0 && numSafe > 0 || numTrapped == 0) {
               curChest = new Chest(false);
               numSafe--;
               numChests--;

            } else if (chestVal == 1 && numTrapped > 0 || numSafe == 0) {
               curChest = new Chest(true);
               numTrapped--;
               numChests--;
            }

            var checkDanger = prompt("Will you check for traps? Y or N ");
            if (checkDanger.toLowerCase().trim() == 'y') {
               var checkRoll = Math.random() * 20;
               if (checkRoll > 10) {
                  if (curChest.isTrapped() == true) {
                     console.log("This chest is definitely trapped!");
                     let disarm = prompt("Would you like to attempt to disarm the chest? Y or N ");
                     if (disarm.toLowerCase().trim() == 'y') {
                        let sleightOfHand = Math.random() * 20;
                        if (sleightOfHand > 13) {
                           curChest.trap = false;
                           console.log("You disarmed the trap!");
                        } else {
                           console.log("Despite your best efforts, this trap was too elaborate for you to disarm safely.")
                        }
                     }
                  } else {
                     console.log("This chest is definitely safe!");
                  }
               } else {
                  if (curChest.isTrapped()) {
                     console.log("You're pretty sure that chest is safe, I think?");
                  } else {
                     console.log("Now I'm no expert, but that chest looks like it may or may not be containing a trap of some variety.");
                  }
               }
            }
            var openChest = prompt("Would you like to open the chest? Y or N ");
            if (openChest.toLowerCase().trim() == 'y') {
               curChest.contents(hero);
               var loot = prompt("Will you take the items in the chest? Y or N ");
               if (loot.toLowerCase().trim() == 'y') {
                  for (let i = 0; i < curChest.healPots; i++) {
                     hero.addItem("health potion");
                  }
                  for (let i = 0; i < curChest.antPot; i++) {
                     hero.addItem("antidote");
                  }
                  hero.addGold(curChest.gold);

                  console.log("You took the loot from the chest!");
                  console.log("There are " + numChests + " chests remaining, if you wish to check them.");
               }
            }
         } else if (action.toLowerCase().trim() == 'exit') {
            console.log("Very well, you may proceed. The doors to the room are unlocked.");
         }
      }

      console.log("You may now proceed to another room, this room is complete.\n");
   }


   libraryLootGen(hero) {
      // generates inventory loot for Mages (spell scrolls, magic buffs, etc.)
      console.log("As you enter the next room, you see towering bookshelves all around you. In the center of the room is a table with glowing runes. It appears you have found an arcane library!");
      if (hero.class == "mage") {
         console.log("I bet you could get a lot more powerful if you read some of the books in the library...\n");
         let buffYN = prompt("Will you take some time to get more powerful? Y or N ");
         if (buffYN.toLowerCase().trim() == "y") {
            console.log("As you read the books around you, you can feel the magical energy flowing through you, and you can feel it becoming greater than before!\n");
            hero.buff(50, 20, 5);
            this.hard -= 0.3; // update the difficulty each time the player "levels up"
            this.medium -= 0.4;
            this.easy -= 0.2;
            console.log("Your hp, damage, and armor have all increased! I wouldn't be surprised if the enemies start getting stronger too...");
         }
      } else {
         console.log("The books here look pretty neat, but I don't think you'd learn anything from it.\n");
      }
   }

   armoryLootGen(hero) {
      // generates inventory loot for Knights (weapons, armor, physical buffs, etc.)
      console.log("As you walk into the next room, the light of torches reflects off rows of armor and weapons, all new and shiny and waiting for an adventurer to take them. You found an armory!\n");
      if (hero.class == "knight") {
         console.log("You know, you'd probably get a lot stronger if you took some of the gear here...\n");
         let buffYN = prompt("Will you take some time to get stronger? Y or N ");
         if (buffYN.toLowerCase().trim() == "y") {
            console.log("As you look around the armory, you find some new armor and a grindstone to sharpen your sword!\n");
            hero.buff(80, 25, 5);
            this.hard -= 0.3; // update the difficulty each time the player "levels up"
            this.medium -= 0.4;
            this.easy -= 0.2;
            console.log("Your hp, damage, and armor have all increased! I wouldn't be surprised if the enemies start getting stronger too...");
         } 
      } else {
         console.log("The stuff in here sure is shiny, but melee weapons aren't really your style.\n");
      }
   }

   bossRoomGen(hero) {
      console.log("As you enter the next room, you see before you a giant fire-breathing dragon atop a mountain of gold. It looks down at you and roars mightily.\n");
      console.log("I hope you're ready, adventurer. The dragon surely is.\n");
      let boss = new Enemy("dragon", 150, 17, 20);
      let bossTreasure = 50000;
      this.combat(hero, boss);
      if (hero.hp > 0 && this.fled == false) {
         console.log("To the winner go the spoils, you collect the gold from the dragon's hoard, about 50000 pieces in total.\n");
         hero.addGold(50000);
         console.log("Among the treasure you find an ULTIMATE HEALTH POTION. It looks too heavy to carry with you, but you can drink it here if you wish.");
         let heal = prompt("Will you drink the ULTIMATE HEALING POTION? Y or N: ");
         if (heal.toLowerCase().trim() == 'y') {
            hero.heal(hero.maxHp);
         }
      }
   }

   combat(hero, monster) {
      this.fled = false;

      console.log("An angry " + monster.type + " attacks! Combat START!");
      while(hero.hp > 0 && monster.hp > 0 && !this.fled) {
         let act = prompt("What will you do, hero? You can FIGHT, use a HEALTH POTION or ANTIDOTE, or FLEE ");
            if (act.toLowerCase().trim() == "flee"){
               //monster.hurt(1000);
               this.fled = true;
            } else {
               
               hero.action(act, monster);
      
               console.log("The " + monster.type + " attacks!");
               monster.attack(hero); 
            }      
      }
      if (this.fled) {
         console.log("You fled from the " + monster.type + ".\n");
         console.log("I mean, I guess that was always an option, but really?\n");
         //console.log("Either way, the demo's over now, I guess.\n");
         //console.log("Feel free to play again if you want.\n");
      } else if (hero.hp > 0){
         console.log("Congratulations, " + hero.name + "! You defeated the " + monster.type + "!\n");
      } else if (hero.hp <= 0){
         console.log("Unfortunately, you were defeated by the " + monster.type + ".\n");
         console.log("Since this is the full game, Here is your \"Game Over\" screen.\n");
         console.log("Feel free to try again!\n");
      }
   }

   keyRoomGen(hero) {
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

   numGameGen() {
      console.log("You see a series of numbers and symbols inscribed on the wall. They read as follows: ");
      console.log("\n1 + 4 = 5\n2 + 5 = 12\n3 + 6 = 21\n8 + 11 = ?");
      console.log("It looks like a number puzzle of some sort.");
      let solved = false;
      while (!solved) {
         var guess = prompt("Any idea what the solution could be? ");
         if (guess.toLowerCase().trim() == 40) {
            solved = true;
            console.log("The door opens with a loud *THUNK*...");
            console.log("You solved the riddle!");
         }
      }
      //console.log("I'm gonna put another type of puzzle here to add more variety to the room generation, I just haven't decided what to put yet.\n");
   }



}

module.exports = dunRoom;