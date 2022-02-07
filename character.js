/* Class file for my game to represent the character Object. There will be 4 main classes: Fighter, Assassin, Mage, and Ranger,
 each with their own unique abilities and movesets.
This program is Inspired by Dungeons and Dragons and is written by Hunter Bowles */


class Character { // Object class for player characters

   constructor(name, maxHp, armor, damage) { 
      /* user inputs determine the character's 
      name, max HP, armor, and damage output. 
      Condition starts null but may change under the right curcumstances. */
      this.name = name;
      this.hp = maxHp;
      this.maxHp = maxHp;
      this.armor = armor;
      this.damage = damage;
      this.condition = null;

   }

   hurt(points) {
      this.hp -= points;
      if (this.hp <= 0) {
         this.conditon = death;
      }
   }

   heal(points) {
      this.hp += points;
   }

   

}