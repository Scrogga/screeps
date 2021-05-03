var roleClaimClaimer = {
    run: function(creep){
        let flag=Game.flags[creep.memory.targetFlag]
        if (flag){
            if(creep.room !== flag.room){
                creep.moveTo(flag);
            }
            else {
                if (creep.room.controller) {
                    if (creep.room.controller.my === false) {
                        if (creep.claimController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller);
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleClaimClaimer;
