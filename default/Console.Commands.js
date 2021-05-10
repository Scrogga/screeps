Game.spawns['Spawn1'].spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'Capturer1', { memory: { role: 'capturer', targetFlag: 'Flag1', mining: 'true'}});
Game.spawns['Spawn1'].spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'Capturer2', { memory: { role: 'capturer', targetFlag: 'Flag1', mining: 'true'}});
Game.creeps['Harvester1'].memory.role = 'harvester'
Game.spawns['Spawn4'].spawnCreep([WORK, CARRY, MOVE], 'Builder.' + Game.time, {memory: {role: 'builder'}});
Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE],'HarvesterBig',{ memory: { role: 'harvester' }});
Game.spawns['Spawn1'].spawnCreep( [WORK,CARRY,MOVE],'Harvester0',{ memory: { role: 'harvester' }});
Game.spawns['Spawn1'].spawnCreep( [WORK,CARRY,MOVE],'extensionFiller0',{ memory: { role: 'extensionFiller' }});
Game.spawns['Spawn1'].spawnCreep( [WORK,CARRY,MOVE],'builder0',{ memory: { role: 'builder' }});
Game.spawns['Spawn1'].room.controller.activateSafeMode();
Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );
Game.rooms.sim.createConstructionSite(10, 15, STRUCTURE_ROAD);
console.log(Object.keys(Game.creeps))
console.log(Game.spawns['Spawn1'].room.energyAvailable)