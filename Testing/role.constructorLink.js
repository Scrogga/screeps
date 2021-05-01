var roleConstructorLink = {
    run: function(creep){
        if(creep.store.getFreeCapacity() < creep.store.getCapacity()){
            const controller = creep.room.controller;
            if(creep.upgradeController(controller) === ERR_NOT_IN_RANGE){
                creep.moveTo(controller);
            }
        }
        else {
            let container = Game.getObjectById('9e20478debe921a')
            if(container){
                if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
            }
        }
    }
};

module.exports = roleConstructorLink;
