var mainLinks = {
    run: function(curRoom) {
        links = curRoom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_LINK);
            }
        });
        let roomController = curRoom.controller
        let controllerLink = roomController.pos.findClosestByRange(links)
        for (let i in links) {
            let link = links[i]
            if (link !== controllerLink) {
                link.transferEnergy(controllerLink)
            }
        }
    }
};

module.exports = mainLinks;