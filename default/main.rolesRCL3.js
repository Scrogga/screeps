var roleharvesterRCL3 = require('role.harvesterRCL3')


var mainRoles = {
    run: function(curRoom){
        //Run role functions
        for(let name in Game.creeps){
            var creep = Game.creeps[name];
            if(creep.memory.role === 'harvesterRCL3'){roleharvesterRCL3.run(creep);}
        }
    }
};

module.exports = mainRoles;
