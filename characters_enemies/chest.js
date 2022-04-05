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

   contents() {
      if (this.trap) {
         this = new Enemy("Mimic", 10, 13, 5);
      } else {
         this.gold = Math.random() * 10 + Math.random() * 100 + Math.random() * 1000;
         this.healPots = Math.random() * 10;
         this.antPot = Math.random() * 10;

         console.log("As you open the chest, you find %d gold pieces, %d health potions, and %d antidotes", this.gold, this.healPots, this.antPot);
      }
   }


}

module.exports = Chest