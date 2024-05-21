export function formatDate(date: Date): string {
    return date.toISOString();
}

export const STREAK_KEY = 'streak';


export interface Streak {
    currentCount: number;
    startDate: string;
    lastLoginDate: string;
}

export enum State {
    INC,
    SAME,
    RESET,
};

export function buildStreak(date: Date, overrideDefaults?: Partial<Streak>): Streak {
    const defaultStreak: Streak = {
        currentCount: 1,
        startDate: formatDate(date),
        lastLoginDate: formatDate(date)
    }

    return {
        ...defaultStreak,
        ...overrideDefaults,
    }
}