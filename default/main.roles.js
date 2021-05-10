var roleHarvester = require('role.harvester')
var roleConstructorStorage = require('role.constructorStorage')
var roleConstructorLink = require('role.constructorLink')
var roleBuilder = require('role.builder')
var roleClaimClaimer = require('role.claimClaimer')
var roleClaimBuilders = require('role.claimBuilder')
var roleExtensionFiller = require('role.extensionFiller')
var roleAttackRemote = require('role.attackRemote')

var mainRoles = {
    run: function(){
        //Run role functions
        for(let i in Game.creeps){
            let creep = Game.creeps[i];
            if(creep.memory.role === 'harvester'){roleHarvester.run(creep);}
            if(creep.memory.role === 'constructorStorage') {roleConstructorStorage.run(creep);}
            if(creep.memory.role === 'constructorLink'){roleConstructorLink.run(creep);}
            if(creep.memory.role === 'builder'){roleBuilder.run(creep);}
            if(creep.memory.role === 'extensionFiller'){roleExtensionFiller.run(creep);}
            if(creep.memory.role === 'backup'){roleBackup.run(creep);}
            if(creep.memory.role === 'claimClaimer'){roleClaimClaimer.run(creep)}
            if(creep.memory.role === 'claimBuilder'){roleClaimBuilders.run(creep)}
            if(creep.memory.role === 'attackRemote'){roleAttackRemote.run(creep)}
        }
    }
};

module.exports = mainRoles;
