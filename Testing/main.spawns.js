var roleSpawns = {
    run: function () {

        //Set wanted creeps
        const wantedHarvesters = 2
        const wantedExtensionFillers = 1
        const wantedConstructorLinks = 2
        let wantedConstructorStorages = 1
        let wantedBuilders

        //Initialise Counts
        let harvesterCount = 0
        let constructorStorageCount = 0
        let constructorLinkCount = 0
        let builderCount = 0
        let extensionFillerCount = 0

        for (let creep in Game.creeps) {
            let creepRole = Memory.creeps[creep].role
            if (creepRole === 'harvester') {harvesterCount += 1;}
            if (creepRole === 'constructorStorage') {constructorStorageCount += 1;}
            if (creepRole === 'constructorLink') {constructorLinkCount += 1;}
            if (creepRole === 'builder') {builderCount += 1;}
            if (creepRole === 'extensionFiller') {extensionFillerCount += 1;}
        }

        let roomEnergy = Game.spawns['Spawn1'].room.energyAvailable
        let name

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
        let sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
        for (let index in sources) {
            let role = 'harvester'
            let sourceObj = sources[index];
            let minersUsingThisSource = Object.keys(Game.creeps).filter(creepName => Game.creeps[creepName].memory.sourceId === sourceObj.id);
            if (minersUsingThisSource.length < 1) {
                name = ('Harvester.' + Game.time)
                Game.spawns['Spawn1'].spawnCreep(minerBody, name, { memory: {sourceId: sourceObj.id,role: role}})
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
            Game.spawns['Spawn1'].spawnCreep(extensionFillerBody, name, {memory: {role: 'extensionFiller'}});
        }

        //Spawn builders
        let constructionSites = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
        if (constructionSites.length > 0) {
            wantedBuilders = 1
        }
        else {
            wantedBuilders = 0
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
            Game.spawns['Spawn1'].spawnCreep(builderBody, name, {memory: {role: 'builder'}});
        }

        //Spawn constructors
        let constructorStorageBody
        let storageIndex = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
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
                Game.spawns['Spawn1'].spawnCreep(constructorStorageBody, name, {memory: {role: 'constructorStorage'}});
            }
        }

        if (constructorLinkCount < wantedConstructorLinks &&
            roomEnergy >= 600 &&
            harvesterCount >= wantedHarvesters &&
            builderCount >= wantedBuilders &&
            constructorStorageCount >= wantedConstructorStorages &&
            extensionFillerCount >= wantedExtensionFillers) {
            name = ('ConstructorLink.' + Game.time)
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], name, {memory: {role: 'constructorLink'}});
            Memory.creepCount.constructor2s += 1;
        }
    }
};
module.exports = roleSpawns;
