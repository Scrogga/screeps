var roleConstructorStorage = {
    run: function(creep){
        if(creep.store.getFreeCapacity() < creep.store.getCapacity()){
            const controller = creep.room.controller;
                if(creep.upgradeController(controller) === ERR_NOT_IN_RANGE){
                    creep.moveTo(controller);
            }
        }
        else {
            let containers = creep.room.find(FIND_STRUCTURES, {
                filter: { structureType: STRUCTURE_STORAGE }
            });
            if(containers.length > 0){
                if (creep.withdraw(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0]);
                }
            }
        }
    }   
};

module.exports = roleConstructorStorage;
