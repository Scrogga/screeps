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
            if (creep.room.controller.ticksToDowngrade < 8000){
                if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}})
                }
            }
            else {
                let extensions = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_EXTENSION) &&
                            (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                    }
                });
                if (extensions) {
                    if (creep.transfer(extensions, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(extensions, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else {
                    let spawns = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_SPAWN) &&
                                (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                        }
                    });
                    if (spawns.length > 0) {
                        if (creep.transfer(spawns[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(spawns[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    } else {
                        let towers = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType === STRUCTURE_TOWER) &&
                                    (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 200);
                            }
                        });
                        if (towers.length > 0) {
                            if (creep.transfer(towers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        } 
                        else{
                            const site = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                            if (site){
                                if (creep.build(site) === ERR_NOT_IN_RANGE){
                                    creep.moveTo(site, {visualizePathStyle: {stroke: '#ffffff'}});
                                }
                            }
                            else {
                                if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}})
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleharvesterRCL3;