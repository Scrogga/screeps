var roleHarvester = {
    run: function(creep) {
        if (creep.memory.mining && creep.store[RESOURCE_ENERGY] === creep.store.getCapacity()){
            creep.memory.mining = false
        }
        if (!creep.memory.mining && creep.store[RESOURCE_ENERGY] === 0){
            creep.memory.mining = true
        }
        if(creep.memory.mining) {
            //console.log(creep.memory.sourceId)
            let sourceTarget = Game.getObjectById(creep.memory.sourceId)
            if(creep.harvest(sourceTarget) === ERR_NOT_IN_RANGE){
                creep.moveTo(sourceTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else if (!creep.memory.mining){
            let link = creep.pos.findInRange(FIND_STRUCTURES, 3,
                {filter: { structureType: STRUCTURE_LINK}});
            if(link.length > 0) {
                if (creep.transfer(link[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(link[0]);
                }
            }
            else {
                let container = creep.pos.findInRange(FIND_STRUCTURES, 3,
                    {filter: {structureType: STRUCTURE_CONTAINER}});
                if (container.length > 0) {
                    if (creep.transfer(container[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(container[0]);
                    }
                }
                else{
                    let spawns = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_SPAWN) &&
                                (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 );
                        }
                    });
                    if (spawns.length > 0) {
                        if (creep.transfer(spawns[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(spawns[0]);
                        }
                    }
                    else {
                        if (creep.room.controller.ticksToDowngrade){
                            if (creep.upgradeController(creep.room.controller, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.controller);
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleHarvester;