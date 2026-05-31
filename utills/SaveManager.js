import AsyncStorage from '@react-native-async-storage/async-storage'

const today = () => new Date().toISOString().split('T')[0]

const yesterday = () => {
    const d = new Date()
    d.setDate(d.getDate() - 1)
    return d.toISOString().split('T')[0]
}

export const saveSession = async ({ task, expectedTime, completionStatus, reflection, xp }) => {
    try {
        const session = {
            date: new Date().toISOString(),
            dateKey: today(),
            task,
            expectedTime,
            completionStatus,
            reflection,
            xp,
        }

        const existing = await AsyncStorage.getItem('sessions')
        const sessions = existing ? JSON.parse(existing) : []
        sessions.push(session)
        await AsyncStorage.setItem('sessions', JSON.stringify(sessions))

        console.log('Sessie opgeslagen:', session)
        return session
    } catch (e) {
        console.error('Opslaan mislukt:', e)
    }
}

export const getSessions = async () => {
    try {
        const data = await AsyncStorage.getItem('sessions')
        return data ? JSON.parse(data) : []
    } catch (e) {
        console.error('Ophalen mislukt:', e)
        return []
    }
}

export const saveDailyProgress = async (progress) => {
    try {
        await AsyncStorage.setItem('dailyProgress', JSON.stringify({
            ...progress,
            dateKey: today()
        }))
    } catch (e) {
        console.error('Daily progress opslaan mislukt:', e)
    }
}

export const getDailyProgress = async () => {
    try {
        const data = await AsyncStorage.getItem('dailyProgress')
        if (!data) return null
        const progress = JSON.parse(data)
        if (progress.dateKey !== today()) return null
        return progress
    } catch (e) {
        return null
    }
}

export const getStreak = async () => {
    try {
        const data = await AsyncStorage.getItem('streak')
        return data ? JSON.parse(data) : { count: 0, lastDate: null }
    } catch (e) {
        return { count: 0, lastDate: null }
    }
}

export const updateStreak = async () => {
    try {
        const streak = await getStreak()
        const todayKey = today()
        const yesterdayKey = yesterday()

        if (streak.lastDate === todayKey) return streak

        let newCount
        if (streak.lastDate === yesterdayKey) {
            newCount = streak.count + 1
        } else {
            newCount = 1
        }

        const newStreak = { count: newCount, lastDate: todayKey }
        await AsyncStorage.setItem('streak', JSON.stringify(newStreak))
        console.log('Streak geüpdatet:', newStreak)
        return newStreak
    } catch (e) {
        console.error('Streak update mislukt:', e)
        return { count: 0, lastDate: null }
    }
}

export const getTotalXP = async () => {
    try {
        const data = await AsyncStorage.getItem('totalXP')
        return data ? JSON.parse(data) : 0
    } catch (e) {
        return 0
    }
}

export const addXP = async (xp) => {
    try {
        const current = await getTotalXP()
        const newTotal = current + xp
        await AsyncStorage.setItem('totalXP', JSON.stringify(newTotal))
        console.log('Totale XP:', newTotal)
        return newTotal
    } catch (e) {
        console.error('XP opslaan mislukt:', e)
        return 0
    }
}

export const clearSessions = async () => {
    await AsyncStorage.removeItem('sessions')
    await AsyncStorage.removeItem('dailyProgress')
    await AsyncStorage.removeItem('streak')
    await AsyncStorage.removeItem('totalXP')
}