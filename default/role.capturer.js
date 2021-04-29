var roleCapturer = {
    run: function(creep){
        let flag=Game.flags[creep.memory.targetFlag]
        if (flag){
            if(creep.room != flag.room){
                creep.moveTo(flag);
            }
            else{
                if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE)
                    creep.moveTo(creep.room.controller);
                console.log(creep + " tried to claim controller, got result " + creep.claimController(creep.room.controller));
            }
        }
    }
};

module.exports = roleCapturer;
