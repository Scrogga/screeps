var mainSpawns = require('main.spawns')
var mainRoles = require('main.roles')
var mainTowers = require('main.towers')
var mainLinks = require('main.links')
var mainSpawnsRCL3 = require('main.spawnsRCL3')
var mainRolesRCL3 = require('main.rolesRCL3')


console.log('Initialising')

module.exports.loop = function(){

    //Clear memory of dead creeps
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name]
        }
    }
    
    //Filter owned rooms
    for (i in Game.rooms){
        if(Game.rooms[i].controller) {
            if (Game.rooms[i].controller.my) {
                let curRoom = Game.rooms[i]
                let hasStorage = curRoom.find(FIND_STRUCTURES, {
                    filter: { structureType: STRUCTURE_STORAGE }
                });
                //Room energy
                if (Game.time % 50 === 0) {
                    console.log('-------')
                    console.log('Room: ' + curRoom + ' Energy: ' + curRoom.energyAvailable)
                }
                mainTowers.run(curRoom)
                mainLinks.run(curRoom)
                if (hasStorage.length > 0){
                    mainSpawns.run(curRoom)
                    mainRoles.run(curRoom)
                }
                else{
                    mainSpawnsRCL3.run(curRoom)
                    mainRolesRCL3.run(curRoom)
                }
            }
        }
    }
};

