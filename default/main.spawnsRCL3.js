var roleSpawns = {
    run: function (curRoom) {
        //console.log(curRoom)
        //Set spawner
        let spawns = curRoom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_SPAWN);
            }
        });
        let spawn
        let spawnTrue = false
        if (spawns.length > 0) {
            spawn = spawns[0]
            spawnTrue = true
        }

        let roomEnergy = curRoom.energyAvailable

        //Spawn miner
        let sources
        if (spawnTrue && roomEnergy >= 300) {
            sources = curRoom.find(FIND_SOURCES);
            if (sources.length > 0) {
                for (let i in sources) {
                    let sourceObj = sources[i];
                    let minersOnSource = Object.keys(Game.creeps).filter(creepName => Game.creeps[creepName].memory.sourceId === sourceObj.id);
                    if (minersOnSource.length < 3) {
                        name = ('HarvesterRCL3.' + Game.time)
                        spawn.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], name, {memory: {sourceId: sourceObj.id, role: 'harvesterRCL3'}})
                    }
                }
            }
        }
    }
};
module.exports = roleSpawns;
