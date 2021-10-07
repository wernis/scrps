const upgraderCreep = {
    run: function(creep: Creep) {
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
                let controllerLocation = creep.room.controller;
                if (controllerLocation) {
                    let upgradeResult = creep.upgradeController(controllerLocation);
                    switch (upgradeResult) {
                        case ERR_NOT_IN_RANGE:
                            creep.moveTo(controllerLocation);
                            break;
                        case OK:
                            break;
                        default:
                            console.log(`Upgrade Result: ${upgradeResult}`)
                    }
                }
            }
            else {
                creep.memory.working = true;
            }
        }
    },
    getWithdrawLocation: function(creep: Creep) {
        let widthdrawLocations = creep.room.find(FIND_MY_STRUCTURES, {
            filter: function(structure) {
                return (
                    structure.structureType === STRUCTURE_STORAGE &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 1000
                )
            }
        });
        if (widthdrawLocations.length > 0) {
            return widthdrawLocations[0];
        }
        widthdrawLocations = creep.room.find(FIND_STRUCTURES, {
            filter: function(structure) {
                return (
                    structure.structureType === STRUCTURE_CONTAINER &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 1500
                )
            }
        });
        if (widthdrawLocations.length > 0) {
            return widthdrawLocations[0];
        }
        return null;
    },
};

export {
    upgraderCreep
};