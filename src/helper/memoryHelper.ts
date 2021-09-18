const memoryHelper = {
    clearDeadCreepMemory: function () {
        // iterate over creeps in memory
        for (const name in Memory.creeps) {
            // check not creep in game
            if (! (name in Game.creeps)) {
                // delete creep in memory
                delete Memory.creeps[name];
            }
        }
    }
};

export { memoryHelper };