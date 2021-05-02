var roleClaimClaimer = {
    run: function(creep){
        let flag=Game.flags[creep.memory.targetFlag]
        //console.log(creep + " tried to claim controller, got result " + creep.claimController(creep.room.controller));
        if (flag){
            if(creep.room !== flag.room){
                creep.moveTo(flag);
                console.log(creep + 'Moving to flag room.')
            }
            else {
                if (creep.room.controller) {
                    if (creep.room.controller.my === false) {
                        if (creep.claimController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller);
                            console.log(creep + " tried to claim controller, got result " + creep.claimController(creep.room.controller));
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleClaimClaimer;
