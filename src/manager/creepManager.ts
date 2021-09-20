// import worker creeps
import { builderCreep } from "worker/tutorial/builder";
// import { harvesterCreep } from "worker/tutorial/harvester";
import { upgraderCreep } from "worker/tutorial/upgrader";

import { harvesterCreep } from "worker/advanced/harvester";

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
        let unknownCount = 0;

        const harvesterMax = 3;
        const builderMax = 2;
        const upgraderMax = 1;

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
    }
};

// export
export {
    creepManager
};