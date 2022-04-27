// Import the object classes for enemies and characters/

const Enemy = require('./enemyClass.js');
const Player = require('./character.js');

const prompt = require('prompt-sync')();

// Begin the Demo
console.log("\nrunning Demo\n");

   // Set default values and pre-generate an enemy.
   
   const opponent = new Enemy("Ogre", 10, 16, 11);
   

   // take user input for name and class, fill in starter stats based on class.
   let name = prompt("What is your name, adventurer, that we might know who you are when you achieve greatness? ");

   let pClass = prompt("What kind of adventurer are you? Are you a Mage, or are you a Knight? ");

   var hero;

   if (pClass.toLowerCase().trim() == "knight") {
      console.log("howdy");
      hero = new Player(name, 20, 13, 6);
   } else if (pClass.toLowerCase().trim() == "mage") {
    
      hero = new Player(name, 10, 10, 13);
   }

   // Generate a Hero based on the given stats
   // console.log(hero.hp);
   

   console.log("Now that we know who you are, welcome to the RanDungeon Combat Demonstration!\n");
   console.log("For your demo, you will be fighting an Ogre.\n");
   console.log("Here it comes!\n\n");

   var fled = false;

   // Begin encounter. Each turn consists of an action from both sides, unless the player selects "flee"
   while(hero.hp > 0 && opponent.hp > 0) {
      let act = prompt("What will you do, hero? You can FIGHT, USE ITEM, or FLEE ");
         if (act.toLowerCase().trim() == "flee"){
            opponent.hurt(1000);
            fled = true;
         }
   
         hero.action(act, opponent);
   
         console.log("The Ogre attacks!");
         opponent.attack(hero);       
      

   }
   if (fled) {
      console.log("You fled from the Ogre?\n");
      console.log("I mean, I guess that was always an option, but really?\n");
      console.log("Either way, the demo's over now, I guess.\n");
      console.log("Feel free to play again if you want.\n");
   } else if (hero.hp > 0){
      console.log("Congratulations, " + hero.name + "! You defeated the Ogre!\n");
      console.log("If this were the full game, you would be allowed to enter another room after collecting some Treasure or gaining EXP.\n");
      console.log("However, this is not a full game yet, so all you get is this message and a sense of accomplishment.\n");
   } else if (hero.hp <= 0){
      console.log("Unfortunately, you were defeated by the Ogre.\n");
      console.log("If this were the full game, you would get a \"Game Over\" screen here and be sent back to the atart with character creation.\n");
      console.log("However, this is not a full game yet, so all you get is this message and a sense of defeat.\n");
   }

   console.log("Thanks for playing!");



