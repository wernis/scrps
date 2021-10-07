const repairerCreep = {
    run: function(creep: Creep) {
        // load working state from the creep's memory
        let working = creep.memory.working;
        if (working) {
            if (creep.store.getFreeCapacity() > 0) {
                let withdrawLocation = this.getWithdrawLocation(creep);
                if (withdrawLocation) {
                    let widthdrawResult = creep.withdraw(withdrawLocation, RESOURCE_ENERGY);
                    switch (widthdrawResult) {
                        case ERR_NOT_IN_RANGE:
                            creep.moveTo(withdrawLocation);
                            break;
                        case OK:
                            // do something if all went OK
                            break;
                    }
                }                
            }
            else {
                creep.memory.working = false;
            }
        }
        else {
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
                let repairLocation: any = this.getRepairLocation(creep);
                let repairResult = creep.repair(repairLocation[0]);
                switch (repairResult) {
                    case ERR_NOT_IN_RANGE:
                        creep.moveTo(repairLocation[0]);
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
            this.getContainersToRepair(creep) ||
            this.getTowersToRepair(creep) ||
            this.getRoadsToRepair(creep) ||
            this.getRampartsToRepair(creep) ||
            this.getWallsToRepair(creep);
        if (! repairLocation) {
            console.log("no repair location.");
            return [];
        }
        return repairLocation;
    },
    getTowersToRepair: function(creep: Creep) {
        const allTowers = creep.room.find(FIND_MY_STRUCTURES, {
            filter: function(structure) {
                return (
                    structure.structureType === STRUCTURE_TOWER &&
                    structure.hits <= (structure.hitsMax * 0.95)
                )
            }
        });
        if (allTowers.length) {
            return allTowers;
        }
        return null;
    },
    getContainersToRepair: function (creep: Creep) {
        const allContainers = creep.room.find(FIND_STRUCTURES, {
            filter: function(structure) {
                return (
                    (structure.structureType === STRUCTURE_CONTAINER) &&
                    (structure.hits < (structure.hitsMax * 0.9))
                )
            }
        });
        if (allContainers.length) {
            return allContainers;
        }
        return null;
    },
    getWithdrawLocation: function(creep: Creep) {
        let withdrawLocation = creep.room.find(FIND_MY_STRUCTURES,{
            filter: function (structure) {
                return (
                    structure.structureType === STRUCTURE_STORAGE &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 5000
                )
            }
        });
        if (withdrawLocation) {
            return withdrawLocation[0];
        };
        withdrawLocation = creep.room.find(FIND_STRUCTURES,{
            filter: function (structure) {
                return (
                    structure.structureType === STRUCTURE_CONTAINER &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 1000
                )
            }
        });
        if (withdrawLocation) {
            return withdrawLocation[0];
        };
        return null;
    },
    getRampartsToRepair: function(creep: Creep) {
        const allRamparts = creep.room.find(FIND_MY_STRUCTURES, {
            filter: function(structure) {
                return (
                    structure.hits < structure.hitsMax &&
                    structure.structureType === STRUCTURE_RAMPART &&
                    structure.hits < Memory.rapartAndWallHits
                )
            }
        });
        if (allRamparts.length) {
            return allRamparts;
        }
        return null;
    },
    getWallsToRepair: function(creep: Creep) {
        const allWalls = creep.room.find(FIND_STRUCTURES, {
            filter: function(structure) {
                return (
                    structure.hits < structure.hitsMax &&
                    structure.structureType === STRUCTURE_WALL &&
                    structure.hits < Memory.rapartAndWallHits
                )
            }
        });
        if (allWalls.length) {
            return allWalls;
        }

        // what is the min ?
        
        Memory.rapartAndWallHits += 1000;
        return null;
    },
    getRoadsToRepair: function(creep: Creep) {
        const allRoads = creep.room.find(FIND_STRUCTURES, {
            filter: function(structure) {
                return (
                    (structure.hits < (structure.hitsMax * 0.90)) &&
                    (structure.structureType === STRUCTURE_ROAD)
                )
            }
        });
        if (allRoads.length) {
            return allRoads;
        }
        return null;
    }
};

export {
    repairerCreep
};