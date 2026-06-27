import { calculateXP } from '../../utills/XpManager'

describe('xpManager', () => {

    test('complete taak met 120 minuten en volledige reflectie geeft max XP', () => {
        const result = calculateXP({
            completionStatus: "complete",
            expectedTime: 120,
            reflection: {
                wentWell: "a".repeat(105), // 100+ characters voor de activering van 5 bonus xp
                wentBad: "a".repeat(105),
                feeling: "a".repeat(105),
            },
            streak: 0,
        })
        // 50 (complete) + 15 (90min) + 15 (reflectie) + 0 (geen streak) = 80
        expect(result.xp).toBe(80)
        expect(result.breakdown.base).toBe(50)
        expect(result.breakdown.timeBonus).toBe(15)
        expect(result.breakdown.reflectionBonus).toBe(15)
        expect(result.breakdown.streakBonus).toBe(0)
    })
    test('incomplete taak met 15 minuten en lege reflectie', () => {
        const result = calculateXP({
            completionStatus: "incomplete",
            expectedTime: 15,
            reflection: {
                wentWell: "",
                wentBad: "",
                feeling: "",
            },
            streak: 0,
        })
        // 10 (incomplete) + 5 (15min) + 0 (geen reflectie) + 0 (geen streak) = 15
        expect(result.xp).toBe(15)
        expect(result.breakdown.base).toBe(10)
        expect(result.breakdown.timeBonus).toBe(5)
        expect(result.breakdown.reflectionBonus).toBe(0)
    })
    test('partial taak 45 minuten en korte reflectie', () => {
        const result = calculateXP({
            completionStatus: "partial",
            expectedTime: 45,
            reflection: {
                wentWell: "a".repeat(55), //50 chars is 3 bonus xp
                wentBad: "a".repeat(55),
                feeling: "a".repeat(55),
            },
            streak: 0,
        })
        // 30 + 10 + 9 (3x3 XP want alle 3 >50 chars) = 49
        expect(result.xp).toBe(49)
        expect(result.breakdown.reflectionBonus).toBe(9)
    })
    test('streak bonus wordt correct toegepast', () => {
        const result = calculateXP({
            completionStatus: 'complete',
            expectedTime: 15,
            reflection: { wentWell: '', wentBad: '', feeling: '' },
            streak: 7,
        })

        // 50 + 5 + 0 + 10 (streak 7 dagen) = 65
        expect(result.xp).toBe(65)
        expect(result.breakdown.streakBonus).toBe(10)
    })
})