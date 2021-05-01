var mainSpawns = require('main.spawns')
var mainRoles = require('main.roles')
var mainTowers = require('main.towers')
var mainLinks = require('main.links')

console.log('Initialising')

module.exports.loop = function(){

    //List energy every 10 ticks
    if (Game.time % 50 === 0) {
        console.log('Energy: ' + Game.spawns['Spawn1'].room.energyAvailable)
    }

    //Clear memory of dead creeps
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name]
        }
    }
    
    //TODO Filter rooms for owned rooms
    for (i in Game.rooms){
        let curRoom = Game.rooms[i]
        //Run creep spawning
        mainSpawns.run(curRoom)
        //Set creep roles
        mainRoles.run(curRoom)
        //Towers
        mainTowers.run(curRoom)
        //Links
        mainLinks.run(curRoom)
    }
};