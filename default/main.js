var mainSpawns = require('main.spawns')
var mainRoles = require('main.roles')

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

    //Tower repairs
    //var tower = Game.room.find(STRUCTURE_TOWER);
    var tower = Game.getObjectById('d301abed7f313ee')
    if(tower){
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => (structure.hits < structure.hitsMax) &&
                (structure.hits <= 750000)
        });
        if(closestDamagedStructure){
            tower.repair(closestDamagedStructure);
        }
    }
    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(closestHostile){
        tower.attack(closestHostile);
    }

    var tower2 = Game.getObjectById('61ebb9abd5c822d')
    if(tower2){
        var closestDamagedStructure = tower2.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => (structure.hits < structure.hitsMax) &&
                (structure.hits <= 750000)
        });
        if(closestDamagedStructure){
            tower2.repair(closestDamagedStructure);
        }
    }
    var closestHostile = tower2.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(closestHostile){
        tower2.attack(closestHostile);
    }

    //Send link energy to controller
    const sourceLink = Game.getObjectById('6b1f4872ef286a2');
    const targetLink = Game.getObjectById('9e20478debe921a');
    sourceLink.transferEnergy(targetLink);
}

//Print functions
/*for(var creep in Game.creeps){
console.log(creep + "'s role is: " + Memory.creeps[creep].role);
}*/