var mainTowers = {
    run: function(curRoom){
        towers = curRoom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_TOWER);
            }
        });
        if(towers.length > 0){
            for(let i in towers){
                let tower = Game.getObjectById(towers[i].id)
                let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => (structure.hits < structure.hitsMax) &&
                        (structure.hits <= 750000)
                });
                if(closestDamagedStructure){
                    tower.repair(closestDamagedStructure);
                }
                let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if(closestHostile){
                    tower.attack(closestHostile);
            }
            }
            
        }
    }
};

module.exports = mainTowers;