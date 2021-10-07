const minerCreep = {
    run: function(creep: Creep) {
        if (! this.verifyMemory(creep)) {
            console.log(`minerCreep [${creep.name}] invalid memory`);
            return;
        }
        let working = creep.memory.working;
        if (working) {
            if (creep.store.getFreeCapacity() > 0) {
                let harvestLocation = this.getMineLocation(creep);
                if (harvestLocation) {
                    let harvestResult = creep.harvest(harvestLocation);
                    switch (harvestResult) {
                        case ERR_NOT_IN_RANGE:
                            creep.moveTo(harvestLocation);
                            break;
                        case OK:
                            break;
                        default:
                            console.log(`Harvest result: ${harvestResult}`);
                            break;
                    }
                }
            }
            else {
                creep.memory.working = false;
            }
        } 
        else {
            if (creep.store.getUsedCapacity() > 0) {
                let depositLocation = this.getDropLocation(creep);
                if (depositLocation) {
                    let depositResult = creep.transfer(depositLocation, RESOURCE_ENERGY);
                    switch (depositResult) {
                        case ERR_NOT_IN_RANGE:
                            creep.moveTo(depositLocation);
                            break;
                        case OK:
                            break;
                        default:
                            console.log(`Drop Result: ${depositResult}`)
                    }
                }
            }
            else {
                creep.memory.working = true;
            }
        }
    },
    verifyMemory: function(creep: Creep) {
        let mineLocationTest = Game.getObjectById(creep.memory.metadata.mineLocationId);
        let depositLocationTest = Game.getObjectById(creep.memory.metadata.dropLocationId);
        if (mineLocationTest && depositLocationTest) {
            return true;
        }
        return false;
    },
    getMineLocation: function(creep: Creep) {
        let sources = creep.room.find(FIND_SOURCES, {
            filter: function (source) {
                return source.energy > 0
            }
        });
        if (sources.length) {
            return sources[0];
        }
        if (creep.memory.metadata.hasOwnProperty("mineLocationId")) {
            let mineLocation: Source = <Source> Game.getObjectById(creep.memory.metadata.mineLocationId);
            if (mineLocation) {
                return mineLocation;
            }
            return null;
        }
        else {
            console.log("Miner needs [mineLocationId]");
            return null;
        }
    },
    getDropLocation: function(creep: Creep) {
        if (creep.memory.metadata.hasOwnProperty("dropLocationId")) {
            let dropLocation: StructureContainer = <StructureContainer> Game.getObjectById(creep.memory.metadata.dropLocationId);
            if (dropLocation) {
                return dropLocation;
            }
            return null;
        }
        else {
            console.log("Miner needs [dropLocationId]");
            return null;
        }
    },
    getContainerDropLocation: function(creep: Creep) {
        let containerLocations = creep.room.find(FIND_STRUCTURES, {
            filter: function(structure) {
                return (
                    structure.structureType === STRUCTURE_CONTAINER
                )
            }
        });
        if (containerLocations.length) {
            return containerLocations[0];
        }
        return null;
    },
};

export {
    minerCreep
};