// chest class to generate the chest objects with random or preset contents.
const Enemy = require('./enemyClass.js');


class Chest {

   constructor(trap) {
      this.open = false;
      this.gold = 0;
      this.healPots = 0;
      this.antPot = 0;
      this.trap = trap;
   }

   isTrapped() {
      return this.trap;
   }

   contents(hero) {
      if (this.trap == true) {
         //this = new Enemy("Mimic", 10, 13, 5);
         console.log("As you open the chest, you hear a slight *hiss* as a poison trap triggers!\n")
         hero.setCon("poison");
         console.log("You are now poisoned! Use an antidote to neutralize the poison!");
      } 
         this.gold = Math.floor(Math.random() * 10 + Math.random() * 100 + Math.random() * 1000);
         this.healPots = Math.floor(Math.random() * 10);
         this.antPot = Math.floor(Math.random() * 10);

         console.log("As you open the chest, you find %d gold pieces, %d health potions, and %d antidotes", this.gold, this.healPots, this.antPot);
      
   }


}

module.exports = Chest