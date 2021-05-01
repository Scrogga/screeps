var setSourceMemory = {
    run: function(creep){
        Source.prototype.memory = undefined;

//Check for rooms creeps are in
        for(var roomName in Game.rooms){
            var room = Game.rooms[roomName];
            //Add room sources if does exist
            if(!room.memory.sources){
                room.memory.sources = {};
                //Find all sources in the current room
                var sources = room.find(FIND_SOURCES);
                for(var i in sources){
                    var source = sources[i];
                    //Create a new empty memory object for this source
                    source.memory = room.memory.sources[source.id] = {};
                    //Now you can do anything you want to do with this source
                    //for example you could add a worker counter:
                    source.memory.workers = 0;
                }
            }
            else{ //The memory already exists so lets add a shortcut to the sources its memory
                var sources = room.find(FIND_SOURCES);//Find all sources in the current room
                for(var i in sources){
                    var source = sources[i];
                    source.memory = this.memory.sources[source.id]; //Set the shortcut
                }
            }
        }
    }
};

module.exports = setSourceMemory;