var mainLinks = {
    run: function(curRoom) {
        let links = curRoom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_LINK);
            }
        });
        let roomController = curRoom.controller
        let controllerLink = roomController.pos.findClosestByRange(links)
        for (let i in links) {
            if (links[i] !== controllerLink) {
                links[i].transferEnergy(controllerLink)
            }
        }
    }
};

module.exports = mainLinks;