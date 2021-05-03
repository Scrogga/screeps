var roleConstructorLink = {
    run: function(creep){
        if(creep.store.getFreeCapacity() < creep.store.getCapacity()){
            const controller = creep.room.controller;
            if(creep.upgradeController(controller) === ERR_NOT_IN_RANGE){
                creep.moveTo(controller);
            }
        }
        else {
            let link = creep.room.controller.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: {structureType: STRUCTURE_LINK }});
            if(link){
                if (creep.withdraw(link, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(link);
                }
            }
        }
    }
};

module.exports = roleConstructorLink;
