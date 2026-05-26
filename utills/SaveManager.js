import AsyncStorage from '@react-native-async-storage/async-storage'

const today = () => new Date().toISOString().split(`T`)[0]
export const saveSession = async ({ task, expectedTime, completionStatus, reflection }) => {
    try {
        const session = {
            date: new Date().toISOString(),
            dateKey: today(),
            task,
            expectedTime,
            completionStatus,
            reflection,
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

export const clearSessions = async () => {
    await AsyncStorage.removeItem('sessions')
    await AsyncStorage.removeItem('dailyProgress')
}