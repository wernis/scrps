const minerCreep = {
    run: function(creep: Creep) {
        let working = creep.memory.working;
        if (working) {
            if (creep.store.getFreeCapacity() > 0) {

            }
        } 
        else {

        }
    },
    getHarvestLocation: function(creep: Creep) {
        let harvestLocation = creep.room.find(FIND_SOURCES, {
            filter: function(structure) {
                
            }
        })
    }
};

export {
    minerCreep
};