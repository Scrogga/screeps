var roleHarvester = require('role.harvester')
var roleConstructorStorage = require('role.constructorStorage')
var roleConstructorLink = require('role.constructorLink')
var roleBuilder = require('role.builder')
var roleClaimClaimer = require('role.claimClaimer')
var roleClaimBuilders = require('role.claimBuilder')
var roleExtensionFiller = require('role.extensionFiller')
var roleBackup = require('role.backup')

var mainRoles = {
    run: function(curRoom){
        //Run role functions
        for(let name in Game.creeps){
            var creep = Game.creeps[name];
            if(creep.memory.role === 'harvester'){roleHarvester.run(creep);}
            if(creep.memory.role === 'constructorStorage') {roleConstructorStorage.run(creep);}
            if(creep.memory.role === 'constructorLink'){roleConstructorLink.run(creep);}
            if(creep.memory.role === 'builder'){roleBuilder.run(creep);}
            if(creep.memory.role === 'extensionFiller'){roleExtensionFiller.run(creep);}
            if(creep.memory.role === 'backup'){roleBackup.run(creep);}
            if(creep.memory.role === 'claimClaimer'){roleClaimClaimer.run(creep)}
            if(creep.memory.role === 'claimBuilder'){roleClaimBuilders.run(creep)}
        }
    }
};

module.exports = mainRoles;
