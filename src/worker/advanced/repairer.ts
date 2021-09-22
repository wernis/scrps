const repairerCreep = {
    run: function(creep: Creep) {
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
                let repairLocations: any = this.getRampartsToRepair(creep);
                if (! (repairLocations.length > 0)) {
                    repairLocations = this.getRoadsToRepair(creep);
                }
                if (! (repairLocations.length > 0)) {
                    Memory.rampartHits += 500;
                    repairLocations = this.getRampartsToRepair(creep);
                }
                if (! (repairLocations.length > 0)) {
                    Memory.wallHits += 500;
                    repairLocations = this.getRoadsToRepair(creep);
                }
                if (! (repairLocations.length > 0)) {
                    console.log("NO REPAIR LOCATIONS")
                }
                let repairResult = creep.repair(repairLocations[0]);
                switch (repairResult) {
                    case ERR_NOT_IN_RANGE:
                        creep.moveTo(repairLocations[0]);
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
    },

    getRepairLocation: function(creep: Creep) {
        let repairLocation: any;
        repairLocation = 
            this.getRampartsToRepair(creep) ||
            this.getRoadsToRepair(creep);
        if (! repairLocation) {
            console.log("no repair location.");
            return [];
        }
        return repairLocation;
    },

    getRampartsToRepair: function(creep: Creep) {
        const allRamparts = creep.room.find(FIND_MY_STRUCTURES, {
            filter: function(structure) {
                return (
                    structure.hits < structure.hitsMax &&
                    structure.structureType === STRUCTURE_RAMPART &&
                    structure.hits < Memory.rampartHits
                )
            }
        });
        return allRamparts;
    },
    getRoadsToRepair: function(creep: Creep) {
        const allRoads = creep.room.find(FIND_STRUCTURES, {
            filter: function(structure) {
                return (
                    structure.hits < structure.hitsMax &&
                    structure.structureType === STRUCTURE_WALL &&
                    structure.hits < Memory.wallHits
                )
            }
        });
        return allRoads;
    }
};

export {
    repairerCreep
};