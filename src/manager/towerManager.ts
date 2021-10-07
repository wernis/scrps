const towerManager = {
    run: async () => {
        let tower: StructureTower = <StructureTower> Game.getObjectById("614ea60fc4632d177c1fc9a6");
        
        let baddies = Game.rooms["E13S27"].find(FIND_HOSTILE_CREEPS);
        if (baddies.length) {
            tower.attack(baddies[0]);
        }
    },
};

export { towerManager };