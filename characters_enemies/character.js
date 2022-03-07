/* Class file for my game to represent the character Object. There will be 4 main classes: Fighter, Assassin, Mage, and Ranger,
 each with their own unique abilities and movesets.
This program is Inspired by Dungeons and Dragons and is written by Hunter Bowles */


class Character { // Object class for player characters

   constructor(heroName, maxHp, armor, damage) {
      /* user inputs determine the character's 
      name, max HP, armor, and damage output. 
      Condition starts null but may change under the right curcumstances. */
      this.name = heroName;
      this.hp = maxHp;
      this.maxHp = maxHp;
      this.armor = armor;
      this.damage = damage;
      this.condition = "";
      this.inventory = ["health potion", "health potion", "health potion"]

   }

   setCon(condition) {
      this.condition = condition;
   }

   getHP() {
      return this.hp;
   }

   hurt(points) {
      this.hp -= points;
      console.log("You took " + points + " points of damage!\n");
      console.log("You have " + this.hp + " Hit Points remaining!\n");
      if (this.hp <= 0) {
         //this.conditon = death;
         //console.log("You have died! GAME OVER");
      }
   }

   heal(points) {
      this.hp += points;
      console.log("You healed for " + points + " points!");
   }

   condition_effect(condition) {
      switch(condition) {
         case "poison":
            this.hurt(3);
         case "prone":
            this.armor /= 2;
            this.damage /= 2;
      }
   }

   action(act, enemy) {
      switch(act) {
         case "stand up":
            if (this.condition == "prone") {
               this.condition = null;
               this.armor *= 2;
               this.damage *= 2;
            }
         case "fight":
            let atk = Math.random();
            if (atk == 1.0) {
               console.log("Critical Hit!");
               enemy.hurt(this.damage * 2);
            } else if (atk * 20 >= enemy.armor) {
               enemy.hurt(this.damage);
            } else {
               console.log("Attack Missed!");
            }
         case "health potion":
            if (this.inventory.includes("health potion")){
               this.heal(5);
               this.inventory.indexOf("health potion") = '';

            }
         case "Use Antidote":
            if (this.condition == "poison") {
               this.condition = null;
               console.log("Cured Poison!");
            }
         case "flee":
            // END the game.
      }
   }
}

module.exports = Character;