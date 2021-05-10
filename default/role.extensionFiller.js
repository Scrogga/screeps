var roleExtensionFiller = {
    run: function(creep) {
        if (creep.store[RESOURCE_ENERGY] === 0) {
            let container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (container) => {
                    return (container.structureType === STRUCTURE_CONTAINER) &&
                        (container.store[RESOURCE_ENERGY] > 400 );
                }
            });
            if(container){
                if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, { visualizePathStyle: { stroke: '#ffffff' }});
                }
            }
            else{
                let storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (storage) => {
                        return (storage.structureType === STRUCTURE_STORAGE) &&
                            (storage.store[RESOURCE_ENERGY] > 0 );
                    }
                });
                if (storage){
                    if (creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' }});
                    }
                }
            }
        }
        else {
            if (creep.room.controller.ticksToDowngrade < 2000){
                if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.controller)
                }
            }
            else {
                let targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_EXTENSION) &&
                            (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                    }
                });
                if (targets) {
                    if (creep.transfer(targets, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else {
                    let targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_SPAWN) &&
                                (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                        }
                    });
                    if (targets.length > 0) {
                        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    } else {
                        let targets = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType === STRUCTURE_TOWER) &&
                                    (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 200);
                            }
                        });
                        if (targets.length > 0) {
                            if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        } else {
                            let targets = creep.room.find(FIND_STRUCTURES, {
                                filter: (structure) => {
                                    return (structure.structureType === STRUCTURE_STORAGE) &&
                                        (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                                }
                            });
                            if (targets.length > 0) {
                                if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleExtensionFiller