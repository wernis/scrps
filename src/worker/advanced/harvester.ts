const harvesterCreep = {
    run: function (creep: Creep) {
        // load working state from the creep's memory
        let working = creep.memory.working;
        if (working) {
            if (creep.store.getFreeCapacity() > 0) {
                let harvestLocations = creep.room.find(FIND_SOURCES);
                let firstLocation = harvestLocations[0];
                let harvestResult = creep.harvest(firstLocation);
                switch (harvestResult) {
                    case ERR_NOT_IN_RANGE:
                        creep.moveTo(firstLocation);
                        break;
                    case OK:
                        // do something if all went OK
                        break;
                }
            }
            else {
                creep.memory.working = false;
            }
        }
        else {
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
                let depositLocations = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: function(structure) {
                        return (
                            (
                                structure.structureType === STRUCTURE_SPAWN ||
                                structure.structureType === STRUCTURE_EXTENSION
                            ) && 
                            (
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                            )
                        )
                    }
                });
                let firstLocation = depositLocations[0];
                let depositResult = creep.transfer(firstLocation, RESOURCE_ENERGY);
                switch (depositResult) {
                    case ERR_NOT_IN_RANGE:
                        creep.moveTo(firstLocation);
                        break;
                    case OK:
                        // do something if all went OK
                        break;
                }
            }
            else {
                creep.memory.working = true;
            }
        }
    }
};

export {
    harvesterCreep
};