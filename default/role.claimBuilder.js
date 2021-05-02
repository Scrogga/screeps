var roleClaimBuilder = {
    run: function(creep){
        let flag=Game.flags[creep.memory.targetFlag]
        //console.log(creep + " tried to claim controller, got result " + creep.claimController(creep.room.controller));
        if (creep.memory.mining&& creep.store[RESOURCE_ENERGY] === creep.store.getCapacity()){
             creep.memory.mining = false
            console.log('Mining - False')
        }
        if (!creep.memory.mining&& creep.store[RESOURCE_ENERGY] === 0){
            creep.memory.mining = true
            console.log('Mining - True')
        }
        if (flag){
            if(creep.room !== flag.room){
                creep.moveTo(flag);
                console.log(creep.name + ' moving to flag room.')
            }
            else {
                if (creep.memory.mining) {
                    console.log(creep.memory.mining)
                    console.log('Mining.')
                    if (creep.harvest(creep.pos.findClosestByPath(flag.room.find(FIND_SOURCES))) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.pos.findClosestByPath(flag.room.find(FIND_SOURCES)))
                    }
                }
                if (!creep.memory.mining) {
                    console.log(creep.memory.mining)
                    const controller = creep.room.controller
                    const site = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                    if (controller.ticksToDowngrade < 10000){
                        console.log('Upgrading controller.')
                        if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    else if (site) {
                        console.log('Building spawn.')
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
