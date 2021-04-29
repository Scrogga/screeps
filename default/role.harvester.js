var roleHarvester = {
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            //console.log(creep.memory.sourceId)
            let sourceTarget = Game.getObjectById(creep.memory.sourceId)
            if(creep.harvest(sourceTarget) === ERR_NOT_IN_RANGE){
                creep.moveTo(sourceTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            let link = creep.pos.findInRange(FIND_STRUCTURES, 3,
                {filter: { structureType: STRUCTURE_LINK}});
            if(link.length > 0) {
                if (creep.transfer(link[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(link[0]);
                }
            }
            else {
                let link = creep.pos.findInRange(FIND_STRUCTURES, 3,
                    {filter: {structureType: STRUCTURE_CONTAINER}});
                if (link.length > 0) {
                    if (creep.transfer(link[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(link[0]);
                    }
                }
            }
        }
    }
};

module.exports = roleHarvester;