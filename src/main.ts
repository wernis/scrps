// import memoryHelper
import { memoryHelper } from "helper/memoryHelper";
import { creepManager } from "manager/creepManager";

// global declerations
declare global {
    interface Memory {
        version: string
    }
    interface CreepMemory {
        role: string;
        room: string;
        working: boolean;
    }
}

Memory.version = "0.0.1";

// main loop
export const loop = () => {
    console.log(`Version: ${Memory.version}`);
    console.log(`Game Tick: ${Game.time}`);

    // run creep manager
    creepManager.run();
    creepManager.spawn();

    // clear dead creeps' memory
    memoryHelper.clearDeadCreepMemory();
};