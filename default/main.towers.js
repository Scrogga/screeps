var mainTowers = {
    run: function(curRoom){
        myTowers = curRoom.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_TOWER);
            }
        });
        if(myTowers.length > 0){
            for(let i in myTowers){
                let tower = myTowers[i]
                let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => (structure.hits < structure.hitsMax) &&
                        (structure.hits <= 1000000)
                });
                const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
                if(closestHostile){
                    tower.attack(closestHostile);
                }
                else if(closestDamagedStructure){
                    tower.repair(closestDamagedStructure);
                }
                
            }
        }
    }
};

module.exports = mainTowers;