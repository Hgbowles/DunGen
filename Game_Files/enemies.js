// File with objects for the various enemies the player may fight
const enemies = {
   "goblin": { // Goblins are the weakest enemy, and will likely be the default first enemy before random selection takes over.
      hp = 7,
      maxHp = 7,
      armor = 15,
      damage = 5,
      condition = null
   },
   "bugbear": { // Bugbears are a decently powerful enemy, dealing more consistent damage than giant spiders but having less flavor.
      hp = 27,
      maxHp = 27,
      armor = 16,
      damage = 11,
      contidion = null
   },
   "giant spider": { // Giant Spiders are the first enemy implemented with status conditions. The spider has a 50% chance to poison the player, dealing extra damage.
      hp = 26,      
      maxHp = 26,
      armor = 14,
      damage = 7,
      condition = "poison"
   },
   "animated armor": { // Animated Armor is a tough enemy to damage, but it doesn't hit very hard.
      hp = 33,
      maxHp = 33,
      armor = 18,
      damage = 10,
      condition = null
   },
   "bandit captain": { // The Bandit Captain is a more challenging fight, dealing lots of damage and having a greater hit point pool than most enemies in the current version of the game.
      hp = 65,
      maxHp = 65,
      armor = 15,
      damage = 17,
      condition = null
   },
   "minotaur": { //The Minotaur is a very powerful foe, dealing lots of damage and knocking opponents prone with its horns
      hp = 76,
      maxHp = 76,
      armor = 14,
      damage = 17,
      condition = "prone"
   }


   

   
}