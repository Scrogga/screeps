var roleBuilder = {
    run: function(creep){
        if(creep.store.getFreeCapacity() < creep.store.getCapacity()){
            const site = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if (site){
                if (creep.build(site) === ERR_NOT_IN_RANGE){
                creep.moveTo(site, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else if(creep.store.getFreeCapacity() > 0) {
            let containers = creep.room.find(FIND_STRUCTURES, {
                filter: { structureType: STRUCTURE_STORAGE }
            });
            if(containers.length > 0){
                if (creep.withdraw(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0]);
                }
            }
            else {
                let spawns = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_SPAWN) &&
                            (structure.store[RESOURCE_ENERGY] > 250 );
                    }
                });
                if (spawns.length > 0) {
                    if (creep.withdraw(spawns[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(spawns[0]);
                    }
                }
                else{
                    creep.say('Waiting')
                }
            }
        }
    }   
};

module.exports = roleBuilder;
