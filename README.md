# js_game
Repository for game project written in JavaScript. Game will be a text based RPG/Dungeon Crawler game, working title is DunGen. 

This game was developed as a self-led project for ISAT252, SP22 at James Madison University.

This project really let me delve into my own interests and see what kind of ideas I could think of, as well as overcome the obstacles in the writing process. 

There are two classes that each have advantages and disadvantages: the damage-soaking knight and the glass-cannon mage.

Players can choose their class, receive an inventory, and be sent into the dungeon.

The player will be prompted to build a character at the start, selecting a name and class. furter character upgrades may be found in the dungeon.

Each room after the starting room is randomly generated, but the map will always consist of a 3x3 square of rooms.

Players may move in any cardinal direction (North, South, East, West), look at the map, access their inventory, or exit the dungeon at any point between rooms. 

Players start off with 4 Health potions and one antidote, and can't exceed their maximum hp when healing.

There will be a locked room with a "boss" monster in it, which the players must find a separate room with a key to unlock. Each dungeon is guaranteed to have exactly one key and exactly one boss.

Other rooms include the Armory and Arcane Library for character upgrades, the treasure room with chests for loot that may be trapped, encounter rooms with monsters of varying difficulty, and a variety of puzzle rooms that may ask riddles or require the player to solve other challenges.

As of right now, player movement between rooms is experiencing a bug where it will either not allow valid movements or move the player into the Boss Room without the key, neither of which should be happening. Such problems are being addressed and will be resolved ASAP.