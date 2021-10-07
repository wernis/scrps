const haulerCreep = {
    run: function(creep: Creep) {
        if (! this.verifyMemory(creep)) {
            console.log(`haulerCreep [${creep.name}] invalid memory`);
            return;
        }
        let working = creep.memory.working;
        if (working) {
            if (creep.store.getFreeCapacity() > 0) {
                let withdrawLocation = this.getWithdrawLocation(creep);
                if (withdrawLocation) {
                    let withdrawResult = creep.withdraw(withdrawLocation, RESOURCE_ENERGY);
                    switch (withdrawResult) {
                        case ERR_NOT_IN_RANGE:
                            creep.moveTo(withdrawLocation);
                            break;
                        case OK:
                            break;
                        default:
                            console.log(`Withdraw result: ${withdrawResult}`);
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
        let withdrawLocationTest = Game.getObjectById(creep.memory.metadata.withdrawLocationId);
        // let depositLocationTest = Game.getObjectById(creep.memory.metadata.depositLocationId);
        if (withdrawLocationTest) {
            return true;
        }
        return false;
    },
    getWithdrawLocation: function(creep: Creep) {
        if (creep.memory.metadata.hasOwnProperty("withdrawLocationId")) {
            let withdrawLocation: StructureContainer = <StructureContainer> Game.getObjectById(creep.memory.metadata.withdrawLocationId);
            if (withdrawLocation) {
                return withdrawLocation;
            }
            return null;
        }
        else {
            console.log("Hauler needs [withdrawLocationId]");
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
            console.log("Hauler has no [dropLocationId], going to spawn -> extension -> tower");
            let dropLocations;
            dropLocations = creep.room.find(FIND_MY_STRUCTURES, {
                filter: function(structure) {
                    return (
                        (structure.structureType === STRUCTURE_SPAWN ||
                        structure.structureType === STRUCTURE_EXTENSION)
                        && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
                    )
                }
            });
            if (dropLocations.length > 0) {
                return dropLocations[0];
            }
            dropLocations = creep.room.find(FIND_MY_STRUCTURES, {
                filter: function(structure) {
                    return (
                        (structure.structureType === STRUCTURE_TOWER)
                        && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
                    )
                }
            });
            if (dropLocations.length > 0) {
                return dropLocations[0];
            }
            dropLocations = creep.room.find(FIND_MY_STRUCTURES, {
                filter: function(structure) {
                    return (
                        (structure.structureType === STRUCTURE_STORAGE)
                        && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
                    )
                }
            });
            if (dropLocations.length > 0) {
                return dropLocations[0];
            }
            return null;
        }
    },
};

export {
    haulerCreep
};