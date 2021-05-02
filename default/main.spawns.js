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
        //console.log(spawn)

        //Set wanted creeps
        let wantedHarvesters = 2
        let wantedExtensionFillers = 1
        let wantedConstructorLinks = 2
        let wantedConstructorStorages = 1
        let wantedBuilders = 0
        let wantedClaimClaimers = 0
        let wantedClaimBuilders = 0

        let flagCapture = Game.flags['Capture']
        let flagSpawns
        if(flagCapture){
            flagSpawns = flagCapture.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_SPAWN);
                }
            });
        }
        if (flagCapture){
            if (!flagCapture.room.controller.my){
                wantedClaimClaimers = 1
            }
            if (flagSpawns = 0){
                wantedClaimBuilders = 2
            }
        }
        //console.log('wantedClaimClaimers:' + wantedClaimClaimers)
        //console.log('wantedClaimBuilders:' + wantedClaimBuilders)

        //Initialise Counts
        let harvesterCount = 0
        let constructorStorageCount = 0
        let constructorLinkCount = 0
        let builderCount = 0
        let extensionFillerCount = 0
        let claimClaimerCount = 0
        let claimBuilderCount = 0

        for (let creep in Game.creeps) {
            let creepRole = Memory.creeps[creep].role
            if (creepRole === 'harvester') {harvesterCount += 1;}
            if (creepRole === 'constructorStorage') {constructorStorageCount += 1;}
            if (creepRole === 'constructorLink') {constructorLinkCount += 1;}
            if (creepRole === 'builder') {builderCount += 1;}
            if (creepRole === 'extensionFiller') {extensionFillerCount += 1;}
            if (creepRole === 'claimClaimer') {claimClaimerCount += 1;}
            if (creepRole === 'claimBuilder') {claimBuilderCount += 1;}
        }

        let roomEnergy = curRoom.energyAvailable

        //Spawn miner if spare source
        let minerBody
        if (roomEnergy < 700) {
            minerBody = [WORK, CARRY, MOVE]
        }
        else if (roomEnergy < 1600){
            minerBody = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE]
        }
        else {
            minerBody = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE ,MOVE]
        }
        let sources
        if (spawnTrue) {
            sources = spawn.room.find(FIND_SOURCES);
            if (sources.length > 0) {
                for (let i in sources) {
                    let sourceObj = sources[i];
                    let minersOnSource = Object.keys(Game.creeps).filter(creepName => Game.creeps[creepName].memory.sourceId === sourceObj.id);
                    if (minersOnSource.length < 1) {
                        name = ('Harvester.' + Game.time)
                        spawn.spawnCreep(minerBody, name, {memory: {sourceId: sourceObj.id, role: 'harvester'}})
                    }
                }
            }
        }

        //Spawn extension fillers
        let extensionFillerBody
        if (roomEnergy <= 400) {
            extensionFillerBody = [WORK, CARRY, MOVE]
        }
        else if(roomEnergy <= 800){
            extensionFillerBody = [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        }
        else{
            extensionFillerBody = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE , MOVE, MOVE, MOVE, MOVE]
        }
        if (extensionFillerCount < wantedExtensionFillers &&
            harvesterCount >= wantedHarvesters) {
            name = ('extensionFiller.' + Game.time)
            if (spawnTrue){
                spawn.spawnCreep(extensionFillerBody, name, {memory: {role: 'extensionFiller'}});
            }
        }

        //Spawn builders
        let constructionSites
        if (spawnTrue){
            constructionSites = spawn.room.find(FIND_CONSTRUCTION_SITES);
            if (constructionSites.length > 0) {
                wantedBuilders = 1
            }
            else {
                wantedBuilders = 0
            }
        }
        let builderBody
        if (roomEnergy < 900) {
            builderBody = [WORK, CARRY, MOVE]
        } else {
            builderBody = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        }
        if (builderCount < wantedBuilders &&
            roomEnergy >= 400 &&
            harvesterCount >= wantedHarvesters &&
            extensionFillerCount >= wantedExtensionFillers) {
            name = ('Builder.' + Game.time)
            if (spawnTrue){
                spawn.spawnCreep(builderBody, name, {memory: {role: 'builder'}});
            }
        }

        //Spawn constructors
        let constructorStorageBody
        if (spawnTrue){
            let storageIndex = spawn.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_STORAGE)}});
            if(storageIndex.length > 0){
                let storage = storageIndex[0]
                if (storage.store[RESOURCE_ENERGY] < 100000 && roomEnergy >= 200){
                    constructorStorageBody = [WORK, CARRY, MOVE]
                }
                else if (storage.store[RESOURCE_ENERGY] < 500000 && roomEnergy >= 400){
                    constructorStorageBody = [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
                }
                else if (storage.store[RESOURCE_ENERGY] > 500000 && roomEnergy >= 800){
                    constructorStorageBody = [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY , MOVE, MOVE, MOVE, MOVE]
                }
                else{
                    wantedConstructorStorages = 0
                }
                if (constructorStorageCount < wantedConstructorStorages &&
                    roomEnergy >= 400 &&
                    harvesterCount >= wantedHarvesters &&
                    builderCount >= wantedBuilders &&
                    extensionFillerCount >= wantedExtensionFillers) {
                    name = ('ConstructorStorage.' + Game.time)
                    if (spawnTrue){
                        spawn.spawnCreep(constructorStorageBody, name, {memory: {role: 'constructorStorage'}});
                    }
                }
            }
        }
        if (constructorLinkCount < wantedConstructorLinks &&
            roomEnergy >= 600 &&
            harvesterCount >= wantedHarvesters &&
            builderCount >= wantedBuilders &&
            constructorStorageCount >= wantedConstructorStorages &&
            extensionFillerCount >= wantedExtensionFillers) {
            name = ('ConstructorLink.' + Game.time)
            if (spawnTrue){
                spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], name, {memory: {role: 'constructorLink'}});
            }
        }

        //spawn room claimers
        if (claimBuilderCount < wantedClaimBuilders &&
            roomEnergy >= 1100){
            if (spawnTrue){
                spawn.spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'ClaimBuilder' + Game.time, { memory: { role: 'claimBuilder', targetFlag: 'Capture', mining: 'true'}});
            }
        }
        if (claimClaimerCount < wantedClaimClaimers &&
            roomEnergy >= 1400){
            if (spawnTrue){
                spawn.spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'ClaimBuilder' + Game.time, { memory: { role: 'claimBuilder', targetFlag: 'Capture', mining: 'true'}});
            }
        }
    }
};
module.exports = roleSpawns;
