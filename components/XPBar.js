import { View, Text, StyleSheet } from 'react-native'
import { getLevelInfo } from "../utills/XpManager"

export default function XPBar({ totalXP, streak }) {
    const { level, xpIntoLevel, xpNeeded, progress, isMaxLevel } = getLevelInfo(totalXP)

    return (
        <View style={styles.container}>


            <View style={styles.topRow}>
                <Text style={styles.streak}>Streak: {streak} dag{streak !== 1 ? 'en' : ''}</Text>
                <Text style={styles.level}>LVL {level}{isMaxLevel ? ' MAX' : ''}</Text>
            </View>

            <View style={styles.barBackground}>
                <View style={[styles.barFill, { width: `${Math.round(progress * 100)}%` }]} />
            </View>

            <Text style={styles.xpText}>
                {isMaxLevel ? 'MAX LEVEL' : `${xpIntoLevel} / ${xpNeeded} XP`}
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        left: 16,
        right: 16,
        backgroundColor: 'rgba(0,0,0,0.55)',
        borderRadius: 10,
        padding: 10,
        gap: 6,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    streak: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
    },
    level: {
        color: '#FFD700',
        fontSize: 13,
        fontWeight: 'bold',
    },
    barBackground: {
        width: '100%',
        height: 14,
        backgroundColor: '#555',
        borderRadius: 7,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#333',
    },
    barFill: {
        height: '100%',
        backgroundColor: '#7FB77E',
        borderRadius: 7,
    },
    xpText: {
        color: '#fff',
        fontSize: 11,
        textAlign: 'center',
    },
})