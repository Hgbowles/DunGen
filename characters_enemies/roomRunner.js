/*
Runner File to proceed through rooms and start puzzles/encounters/etc.
Generates a grid of rooms, including a single boss room, a single key room, and a single start room.
All other rooms are randomly generated.
*/

const Room = require('./room.js');
const prompt = require('prompt-sync')();


let map = [ // a 3x5 2-D array of rooms, the starting room at [0][0], all other rooms are randomly generated.
   [new Room("start", null, map[1][0], map[0][1], null), new Room(null, map[1][1], map[0][2], map[0][0]), new Room(null, map[1][2], null, map[0][1])],
   [new Room(map[0][0], map[2][0], map[1][1], null), new Room(map[0][1], map[2][1], map[1][2], map[1][0]), new Room(map[0][2], map[2][2], null, map[1][1])],
   [new Room(map[1][0], map[3][0], map[2][1], null), new Room(map[1][1], map[3][1], map[2][2], map[2][0]), new Room(map[1][2], map[3][2], null, map[2][1])],
   [new Room(map[2][0], map[3][0], map[3][1], null), new Room(map[2][1], map[4][1], map[3][2], map[3][0]), new Room(map[2][2], map[4][2], null, map[3][1])],
   [new Room(map[3][0], null, map[4][1], null), new Room(map[3][1], null, map[4][2], map[4][0]), new Room(map[3][2], null, null, map[4][1])]
];



