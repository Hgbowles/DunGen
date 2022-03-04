/* Object Class to handle enemies and their special actions.
WIll contain data such as condition affliction and and random generation, i think. */

class Enemy {
   
   constructor(creatureType, maxHp, armor, damage) {
      this.type = creatureType;
      this.hp = maxHp;
      this.maxHp = maxHp;
      this.armor = armor;
      this.damage = damage;
      this.condition = null;
      if (creatureType == "giant spider") {
         this.condition = "poison";
      } else if (creatureType == "minotaur") {
         this.condition = "prone";
      }
   }

   hurt(points) {
      console.log("Enemy takes " + points + " points of damage!\n");
      console.log("Enemy has " + this.hp + " Hit Points remaining!\n");
      this.hp -= points;
   }

   afflict(condition, character) {
      character.setCon(condition);
   }

   attack(character) {

      let atk = Math.random() * 20;
      if (atk > character.armor) {
         character.hurt(this.damage);
         //console.log("Enemy hits for " + this.damage + " points of damage!");
         if (this.condition != null) {
            switch(this.condition) {
               case "poison":
                  if (Math.random() > 0.5) {
                     this.afflict(this.condition);
                  }
               case "prone":
                  this.afflict(this.condition);
            }
         }
      }

   }

}

module.exports = Enemy;
