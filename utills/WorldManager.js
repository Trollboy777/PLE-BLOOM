import { getLevelInfo } from './XpManager'

// welke assets per level actief zijn
export const getWorldState = (totalXP) => {
    const { level } = getLevelInfo(totalXP)

    return {
        // bomen
        treeAsset: level >= 4
            ? require('../assets/tree-upgraded.png')
            : require('../assets/tree-basic.png'),

        // pebbles
        pebbleAsset: level >= 6
            ? require('../assets/pebble2.png')
            : level >= 2
                ? require('../assets/pebble1.png')
                : require('../assets/pebble.png'),

        // gras
        grassAsset: level >= 3
            ? require('../assets/grass-berry.png')
            : require('../assets/grass-small.png'),

        // huizen
        showHouse1: level >= 5,
        showHouse2: level >= 5,
        showHouse3: level >= 7,
        showHouse4: level >= 7,
        showHouse5: level >= 8,

        // mensen
        showHuman1: level >= 6,
        showHuman2: level >= 8,

        level,
    }
}