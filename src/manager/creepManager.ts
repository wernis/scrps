// import worker creeps
import { basicCreep } from "worker/basic";
import { minerCreep } from "worker/miner";
import { repairerCreep } from "worker/repairer";
import { upgraderCreep } from "worker/upgrader";

// define creepManager
const creepManager = {
    run: function () {
        for (let name in Game.creeps) {
            const creep = Game.creeps[name];
            switch (creep.memory.role) {
                case "basic":
                    basicCreep.run(creep);
                    break;
                case "upgrader":
                    upgraderCreep.run(creep);
                    break;
                case "miner":
                    minerCreep.run(creep);
                    break;
                case "repairer":
                    repairerCreep.run(creep);
                    break;
                case "upgrader":
                    upgraderCreep.run(creep);
                    break;
                default:
                    console.log(`Creep [name:${name}] role incorrect: ${creep.memory.role}`)
                    break;;
            }
        }
    }
};

// export
export {
    creepManager
};