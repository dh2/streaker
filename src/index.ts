import { STREAK_KEY, Streak, State, formatDate, buildStreak } from "./utils";


export function dateDiff(dateLeft: Date, dateRight: Date): number {
    const diffTime = Math.abs(dateLeft.getTime() - dateRight.getTime());
    
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function defineState( currDate: Date, lastLogin:string ): State {
    const diff = dateDiff(new Date(lastLogin), currDate);

    if (diff > 1) {
        return State.RESET;
    }

    if (diff === 1) {
        return State.INC;
    }

    return State.SAME;
}


export function streakCounter( storage: Storage, date: Date): Streak {
    const storageValues = storage.getItem(STREAK_KEY);
    let streak = buildStreak(date);
    
    if (storageValues) {
        try {
            const parsedStreak = JSON.parse(storageValues) as Streak;
            const currStreak = buildStreak(date, parsedStreak);
            const state = defineState(date, currStreak.lastLoginDate);

            if ( state === State.SAME) {
                return currStreak as Streak;
            } else if (state === State.INC) {
                streak = buildStreak(date, {
                    ...currStreak,
                    currentCount: Number(streak.currentCount) + 1,
                    lastLoginDate: formatDate(date),
                });

            }
        } catch (error) {
            console.error("Failed to parse streak from localStorage");
        }
    }

    storage.setItem(STREAK_KEY, JSON.stringify(streak));
    
    return streak;
}