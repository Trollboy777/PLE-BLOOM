const BASE_XP = {
    complete: 50,
    partial: 30,
    incomplete: 10,
}

// Extra XP Bonus based on the time you work on your tasks
const getTimeBonus = (minutes) => {
    if (minutes >= 90) return 15
    if (minutes >= 45) return 10
    if (minutes >= 15) return 5
    return 0
}

// Extra XP Bonus based on how many characters you've filled in on the reflection
const getAnswerXP = (answer) => {
    if (!answer || answer.trim().length === 0) return 0
    if (answer.trim().length > 100) return 5
    if (answer.trim().length > 50) return 3
    return 1
}

// Extra XP Bonus based on streaks
const getStreakBonus = (streak) => {
    if (streak >= 30) return 35
    if (streak >= 20) return 25
    if (streak >= 14) return 20
    if (streak >= 10) return 15
    if (streak >= 7)  return 10
    if (streak >= 3)  return 5
    return 0
}

export const calculateXP = ({ completionStatus, expectedTime, reflection, streak }) => {
    const base = BASE_XP[completionStatus] ?? 10
    const timeBonus = getTimeBonus(expectedTime)
    const reflectionBonus =
        getAnswerXP(reflection?.wentWell) +
        getAnswerXP(reflection?.wentBad) +
        getAnswerXP(reflection?.feeling)
    const streakBonus = getStreakBonus(streak)
    const total = base + timeBonus + reflectionBonus + streakBonus
    const finalXP = Math.min(total, 100)

    console.log('XP breakdown:', { base, timeBonus, reflectionBonus, streakBonus, total, finalXP })

    return {
        xp: finalXP,
        breakdown: { base, timeBonus, reflectionBonus, streakBonus }
    }
}

const LEVEL_THRESHOLDS = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200]

export const getLevelInfo = (totalXP) => {
    let level = 1
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
        if (totalXP >= LEVEL_THRESHOLDS[i]) {
            level = i + 1
            break
        }
    }

    const currentLevelXP = LEVEL_THRESHOLDS[level - 1]
    const nextLevelXP = LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]
    const xpIntoLevel = totalXP - currentLevelXP
    const xpNeeded = nextLevelXP - currentLevelXP
    const progress = level >= 10 ? 1 : xpIntoLevel / xpNeeded

    return {
        level,
        xpIntoLevel,
        xpNeeded,
        progress,
        isMaxLevel: level >= 10,
    }
}