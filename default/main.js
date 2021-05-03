var mainSpawns = require('main.spawns')
var mainRoles = require('main.roles')
var mainTowers = require('main.towers')
var mainLinks = require('main.links')
var mainSpawnsRCL3 = require('main.spawnsRCL3')
var mainRolesRCL3 = require('main.rolesRCL3')


console.log('Initialising')

module.exports.loop = function(){

    console.log('---------------------------')
    //List energy every 10 ticks
    if (Game.time % 50 === 0) {
        //console.log('Energy: ' + Game.spawns['Spawn1'].room.energyAvailable)
    }

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
                //console.log(curRoom)
                if (curRoom.controller.level > 3){
                    //Creep spawning
                    mainSpawns.run(curRoom)
                    //Creep roles
                    mainRoles.run(curRoom)
                    //Towers
                    mainTowers.run(curRoom)
                    //Links
                    mainLinks.run(curRoom)
                }
                else{
                    mainSpawnsRCL3.run(curRoom)
                    mainRolesRCL3.run(curRoom)
                    mainTowers.run(curRoom)
                    mainLinks.run(curRoom)
                }
            }
        }
    }
};

