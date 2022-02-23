/* 
Runner class for RanDungeon demonstration
Runs a basic combat following user input
*/

// include files found in characters_enemies
import(Character);
import (enemy);


function main() {
   let armor = 0;
   let maxHP = 0;
   let damage = 0;
   let opponent = new enemy("Ogre", 27, 16, 11);

   let name = prompt("What is your name, adventurer, that we might know who you are when you achieve greatness?", "Randall Peterson");

   let pClass = prompt("What kind of adventurer are you? Are you a Mage, or are you a Knight?", "knight");

   if (pClass == "knight" || pClass == "Knight") {
      armor = 13;
      maxHP = 20;
      damage = 6;
   } else if (pClass == "mage" || pClass == "Mage") {
      armor = 10;
      maxHP = 10;
      damage = 13
   }

   let hero = new Character(name, pClass, maxHP, armor, damage);

   console.log("Now that we know who you are, welcome to the RanDungeon Combat Demonstration!\n");
   console.log("For your demo, you will be fighting an Ogre.\n");
   console.log("Here it comes!\n\n");

   while(hero.hp > 0 && opponent.hp > 0) {
      let act = prompt("What will you do, hero? You can FIGHT, USE ITEM, or FLEE", "FLEE");

      hero.action(act, opponent);

      console.log("The Ogre attacks!");
      opponent.attack(hero);

   }

   if (hero.hp > 0){
      console.log("Congratulations, " + hero.name + "! You defeated the Ogre!\n");
      console.log("If this were the full game, you would be allowed to enter another room after collecting some Treasure or gaining EXP.\n");
      console.log("However, this is not a full game yet, so all you get is this message and a sense of accomplishment.\n");
   } else if (hero.hp <= 0){
      console.log("Unfortunately, you were defeated by the Ogre.\n");
      console.log("If this were the full game, you would get a \"Game Over\" screen here and be sent back to the atart with character creation.\n");
      console.log("However, this is not a full game yet, so all you get is this message and a sense of defeat.\n");
   }

   console.log("Thanks for playing!");




}