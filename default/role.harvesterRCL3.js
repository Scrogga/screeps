var roleharvesterRCL3 = {
    run: function(creep){
        if (creep.memory.mining && creep.store[RESOURCE_ENERGY] === creep.store.getCapacity()){
            creep.memory.mining = false
        }
        if (!creep.memory.mining && creep.store[RESOURCE_ENERGY] === 0){
            creep.memory.mining = true
        }
        if (creep.memory.mining) {
            let sourceTarget = Game.getObjectById(creep.memory.sourceId)
            if(creep.harvest(sourceTarget) === ERR_NOT_IN_RANGE){
                creep.moveTo(sourceTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        if (!creep.memory.mining) {
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = roleharvesterRCL3;