const builderCreep = {
    run: function (creep: Creep) {
        let working = creep.memory.working;
        if (working) {
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
                let buildLocation = this.getBuildLocation(creep);
                if (buildLocation) {
                    let buildResult = creep.build(buildLocation);
                    switch (buildResult) {
                        case ERR_NOT_IN_RANGE:
                            creep.moveTo(buildLocation);
                            break;
                        case OK:
                            break;
                        default:
                            console.log(`Build result: ${buildResult}`);
                            break;
                    }
                }
            }
            else {
                creep.memory.working = false;
            }
        }
        else {
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
                creep.memory.working = true;
            }
        }
    },
    getWithdrawLocation: function(creep: Creep) {
        let widthdrawLocations = creep.room.find(FIND_STRUCTURES, {
            filter: function(structure) {
                return (
                    structure.structureType === STRUCTURE_CONTAINER &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 900
                )
            }
        });
        if (widthdrawLocations.length) {
            return widthdrawLocations[0];
        }
        return null;
    },
    getBuildLocation: function (creep: Creep) {
        var buildLocations = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(buildLocations.length) {
            return buildLocations[0];
        }
        return null;
    }
};

export {
    builderCreep
};