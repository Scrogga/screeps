var mainSpawns = require('main.spawns')
var mainRoles = require('main.roles')
var mainTowers = require('main.towers')

//Print initialise
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
            //console.log('Clearing dead bitches from memory:', name);
        }
    }

    //Run creep spawning
    mainSpawns.run()
    //Set creep roles
    mainRoles.run()
    //Towers
    mainTowers.run(Game.spawns['Spawn1'].room)
    
    //Send link energy to controller
    const sourceLink = Game.getObjectById('6b1f4872ef286a2');
    const targetLink = Game.getObjectById('9e20478debe921a');
    sourceLink.transferEnergy(targetLink);
}

//Print functions
/*for(var creep in Game.creeps){
console.log(creep + "'s role is: " + Memory.creeps[creep].role);
}*/