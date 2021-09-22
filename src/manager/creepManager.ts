// import worker creeps
import { builderCreep } from "worker/tutorial/builder";
// import { harvesterCreep } from "worker/tutorial/harvester";
import { upgraderCreep } from "worker/tutorial/upgrader";

import { harvesterCreep } from "worker/advanced/harvester";
import { repairerCreep } from "worker/advanced/repairer";

// define creepManager
const creepManager = {
    run: function () {
        for (let name in Game.creeps) {
            const creep = Game.creeps[name];
            switch (creep.memory.role) {
                case "harvester":
                    harvesterCreep.run(creep);
                    break;
                case "upgrader":
                    upgraderCreep.run(creep);
                    break;
                case "builder":
                    builderCreep.run(creep);
                    break;
                case "repairer":
                    repairerCreep.run(creep);
                        break;
                default:
                    console.log(`Creep [name:${name}] role incorrect: ${creep.memory.role}`)
                    break;
            }
        }
    },
    spawn: function () {
        let harvesterCount = 0;
        let builderCount = 0;
        let upgraderCount = 0;
        let repairerCount = 0;
        let minerCount = 0;
        let unknownCount = 0;

        const harvesterMax = 3;
        const builderMax = 1;
        const upgraderMax = 3;
        const minerMax = 0;
        const repairerMax = 2;

        for (let name in Game.creeps) {
            const creep = Game.creeps[name];
            switch (creep.memory.role) {
                case "harvester":
                    harvesterCount++;
                    break;
                case "upgrader":
                    upgraderCount++;
                    break;
                case "builder":
                    builderCount++;
                    break;
                case "repairer":
                    repairerCount++;
                    break;
                case "miner":
                    minerCount++;
                    break;
                default:
                    unknownCount++;
                    break;
            }
        }

        if (harvesterCount < harvesterMax) {
            Game.spawns["spawn001"].spawnCreep([WORK, WORK, CARRY, MOVE], `harvester-${Game.time}`, { memory: { role: "harvester", room: "", working: false }});
        }
        if (builderCount < builderMax) {
            Game.spawns["spawn001"].spawnCreep([WORK, WORK, CARRY, MOVE], `builder-${Game.time}`, { memory: { role: "builder", room: "", working: false }});
        }
        if (upgraderCount < upgraderMax) {
            Game.spawns["spawn001"].spawnCreep([WORK, WORK, CARRY, MOVE], `upgrader-${Game.time}`, { memory: { role: "upgrader", room: "", working: false }});
        }
        if (repairerCount < repairerMax) {
            Game.spawns["spawn001"].spawnCreep([WORK, WORK, CARRY, MOVE], `repairer-${Game.time}`, { memory: { role: "repairer", room: "", working: false }});
        }
        if (minerCount < minerMax) {
            Game.spawns["spawn001"].spawnCreep([WORK, WORK, CARRY, MOVE], `miner-${Game.time}`, { memory: { role: "miner", room: "", working: false }});
        }
    }
};

// export
export {
    creepManager
};