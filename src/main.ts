// import memoryHelper
import { memoryHelper } from "helper/memoryHelper";
import { creepManager } from "manager/creepManager";

// global declerations
declare global {
    interface Memory {
        version: "0.0.1"
    }
    interface CreepMemory {
        role: string;
        room: string;
        working: boolean;
    }
}

// main loop
export const loop = () => {
    console.log(`Current game tick is ${Game.time}`);

    // run creep manager
    creepManager.run();

    // clear dead creeps' memory
    memoryHelper.clearDeadCreepMemory();
};