// import worker creeps
// import { builderCreep } from "worker/tutorial/builder";
// import { harvesterCreep } from "worker/tutorial/harvester";
// import { upgraderCreep } from "worker/tutorial/upgrader";

import { harvesterCreep } from "worker/advanced/harvester";
import { builderCreep } from "worker/advanced/builder";
import { repairerCreep } from "worker/advanced/repairer";
import { haulerCreep } from "worker/advanced/hauler";
import { upgraderCreep } from "worker/advanced/upgrader";
import { minerCreep } from "worker/advanced/miner";

// define creepManager
const creepManager = {
    run: function () {
        for (let name in Game.creeps) {
            // load creep by name
            const creep = Game.creeps[name];
            // switch on creep role
            switch (creep.memory.role) {
                // harvester
                case "harvester":
                    harvesterCreep.run(creep);
                    break;
                    // upgrader
                case "upgrader":
                    upgraderCreep.run(creep);
                    break;
                // builder
                case "builder":
                    builderCreep.run(creep);
                    break;
                // repairer
                case "repairer":
                    repairerCreep.run(creep);
                    break;
                // hauler
                case "hauler":
                    haulerCreep.run(creep);
                    break;
                // miner
                case "miner":
                    minerCreep.run(creep);
                    break;
                // none of the above
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
        let haulerCount = 0;
        let unknownCount = 0;

        const harvesterMax = 0;
        const builderMax = 0;
        const upgraderMax = 6;
        const minerMax = 2;
        const haulerMax = 2;
        const repairerMax = 4;

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
                case "hauler":
                    haulerCount++;
                    break;
                default:
                    unknownCount++;
                    break;
            }
        }
        if (unknownCount) {
            console.log(`There are ${unknownCount} unknown creeps`);
        }

        if (harvesterCount < harvesterMax) {
            Game.spawns["spawn001"].spawnCreep([WORK, WORK, CARRY, MOVE], `harvester-${Game.time}`, { memory: { role: "harvester", room: "", working: false, metadata: null }});
        }
        if (builderCount < builderMax) {
            Game.spawns["spawn001"].spawnCreep([WORK, WORK, CARRY, MOVE], `builder-${Game.time}`, { memory: { role: "builder", room: "", working: false, metadata: null }});
        }
        if (upgraderCount < upgraderMax) {
            Game.spawns["spawn001"].spawnCreep([WORK, WORK, CARRY, MOVE], `upgrader-${Game.time}`, { memory: { role: "upgrader", room: "", working: false, metadata: null }});
        }
        if (repairerCount < repairerMax) {
            Game.spawns["spawn001"].spawnCreep([WORK, WORK, CARRY, MOVE], `repairer-${Game.time}`, { memory: { role: "repairer", room: "", working: false, metadata: null }});
        }
        if (minerCount < minerMax) {
            let canSpawnMegaMiner = Game.spawns["spawn001"].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE], `miner-${Game.time}`, { dryRun: true, memory: { role: "miner", room: "", working: false, metadata: { mineLocationId: "5982fedcb097071b4adc19db", dropLocationId: "614e7beafd0e5e0514175f78"} }});
            console.log(`canSpawnMegaMiner: ${canSpawnMegaMiner}`);
            if (canSpawnMegaMiner === ERR_NOT_ENOUGH_ENERGY) {
                console.log(`spawning smaller miner`);
                Game.spawns["spawn001"].spawnCreep([WORK, WORK, CARRY, MOVE], `miner-${Game.time}`, { memory: { role: "miner", room: "", working: false, metadata: { mineLocationId: "5982fedcb097071b4adc19db", dropLocationId: "614e7beafd0e5e0514175f78"} }});
            }
            else if(canSpawnMegaMiner === OK) {
                console.log(`spawning mega miner`);
                Game.spawns["spawn001"].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE], `miner-${Game.time}`, { memory: { role: "miner", room: "", working: false, metadata: { mineLocationId: "5982fedcb097071b4adc19db", dropLocationId: "614e7beafd0e5e0514175f78"} }});
            }
            else {
                console.log(`spawning mega miner FAIL`);
            }
        }
        if (haulerCount < haulerMax) {
            Game.spawns["spawn001"].spawnCreep([MOVE, CARRY, MOVE, CARRY, CARRY, MOVE], `hauler-${Game.time}`, { memory: { role: "hauler", room: "", working: false, metadata: { withdrawLocationId: "614e7beafd0e5e0514175f78"} }});
        }
    }
};

// export
export {
    creepManager
};