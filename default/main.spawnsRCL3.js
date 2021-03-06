var roleSpawns = {
    run: function (curRoom) {
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
        if (spawnTrue) {
            let minerBody
            if (roomEnergy >= 900){
                minerBody = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
            }
            else if (roomEnergy >= 400){
                minerBody = [WORK,WORK,CARRY,MOVE,MOVE,MOVE];
            }
            else {
                minerBody = [WORK,CARRY,MOVE];
            }
            sources = curRoom.find(FIND_SOURCES);
            if (sources.length > 0) {
                for (let i in sources) {
                    let sourceObj = sources[i];
                    let minersOnSource = Object.keys(Game.creeps).filter(creepName => Game.creeps[creepName].memory.sourceId === sourceObj.id);
                    if (minersOnSource.length < 3) {
                        let name = ('HarvesterRCL3.' + Game.time)
                        spawn.spawnCreep(minerBody, name, {memory: {sourceId: sourceObj.id, role: 'harvesterRCL3'}})
                    }
                }
            }
        }
    }
};
module.exports = roleSpawns;
