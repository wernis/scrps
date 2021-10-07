const cpuHelper = {
    buyPixel: () => {
        if(Game.cpu.bucket == 10000) {
            Game.cpu.generatePixel();
        }
    }
};

export {
    cpuHelper
};