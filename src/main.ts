// import memoryHelper
import { memoryHelper } from "helper/memoryHelper";
import { cpuHelper } from "helper/cpuHelper";
import { creepManager } from "manager/creepManager";
import { towerManager } from "manager/towerManager";

// global declerations
declare global {
    interface Memory {
        version: string;
        rapartAndWallHits: number;
    }
    interface CreepMemory {
        role: string;
        room: string;
        working: boolean;
        metadata: any;
    }
}

// bootstrap the memory on deploy
Memory.version = "0.0.1";
Memory.rapartAndWallHits = 555000;

// main loop
export const loop = () => {
    console.log(`Version: ${Memory.version}`);
    console.log(`Game Tick: ${Game.time}`);

    cpuHelper.buyPixel();

    // run creep manager
    creepManager.run();
    creepManager.spawn();

    towerManager.run();

    // clear dead creeps' memory
    memoryHelper.clearDeadCreepMemory();
};