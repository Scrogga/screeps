var roleClaimBuilder = {
    run: function(creep){
        let flag=Game.flags[creep.memory.targetFlag]
        if (creep.memory.mining&& creep.store[RESOURCE_ENERGY] === creep.store.getCapacity()){
             creep.memory.mining = false
        }
        if (!creep.memory.mining&& creep.store[RESOURCE_ENERGY] === 0){
            creep.memory.mining = true
        }
        if (flag){
            if(creep.room !== flag.room){
                creep.moveTo(flag);
            }
            else {
                if (creep.memory.mining) {
                    if (creep.harvest(creep.pos.findClosestByPath(flag.room.find(FIND_SOURCES))) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.pos.findClosestByPath(flag.room.find(FIND_SOURCES)))
                    }
                }
                if (!creep.memory.mining) {
                    const controller = creep.room.controller
                    const site = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                    if (controller.ticksToDowngrade < 10000){
                        if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    else if (site) {
                        if (creep.build(site) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(site, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleClaimBuilder;
