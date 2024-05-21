import { JSDOM } from 'jsdom';
import { streakCounter } from "../src";
import { formatDate, STREAK_KEY, Streak } from "../src/utils";


const TEST_DATE = '05/04/2024';
const NEXT_DATE = '05/05/2024';
const LATER_DATE = '06/05/2024';

const defaultStreak: Streak = {
    currentCount: 1,
    startDate: formatDate(new Date(TEST_DATE)),
    lastLoginDate: formatDate(new Date(TEST_DATE))
};

describe('Streak Counter: Streaker', () => {
    let mockLocalStorage: Storage;
    let loadedStreak = defaultStreak;

    beforeEach(() => {
        const mockJSDom = new JSDOM("", { url: "https://localhost"});
        mockLocalStorage = mockJSDom.window.localStorage;
    });

    it('Should return a streak object with  currentCount, startDate, and lastLoginDate', () => {
        const date = new Date();
        const streak = streakCounter(mockLocalStorage, date);

        expect(streak.hasOwnProperty('currentCount')).toBe(true);
        expect(streak.hasOwnProperty('startDate')).toBe(true);
        expect(streak.hasOwnProperty('lastLoginDate')).toBe(true);
    })
    
    it('Should return a streak starting at 1 and keep track of lastLoginDate', () => {
        const date = new Date();
        const streak = streakCounter(mockLocalStorage, date);

        expect(streak.currentCount).toEqual(1);
        expect(streak.lastLoginDate).toEqual(formatDate(date));
        // expect(streak.hasOwnProperty('startDate')).toBe(true)
    })
    
    it('Should have streak in localStorage', () => {
        const date = new Date();
        
        const x = streakCounter(mockLocalStorage, date);
        // console.log(mockLocalStorage);
        const streakAsString = mockLocalStorage.getItem(STREAK_KEY);

        expect(streakAsString).not.toBeNull();
    })

    describe('Using a pre-loaded streak', () => {
        beforeEach(() => {
            const mockJSDom = new JSDOM("", { url: "https://localhost"});
            mockLocalStorage = mockJSDom.window.localStorage;

            mockLocalStorage.setItem(STREAK_KEY, JSON.stringify(loadedStreak));
        });

        it('should return the streak from localStorage', () => {
            const date = new Date(TEST_DATE);
            const streak = streakCounter(mockLocalStorage, date);

            expect(streak.startDate).toEqual(loadedStreak.startDate);
        })
        
        it('should increment the streak if consecutive', () => {
            const date = new Date(NEXT_DATE);
            const streak = streakCounter(mockLocalStorage, date);

            expect(streak.currentCount).toEqual(2);
            expect(streak.lastLoginDate).toEqual(formatDate(date));
        })
        
        it('should not increment the streak if not consecutive', () => {
            const date = new Date(LATER_DATE);
            const streak = streakCounter(mockLocalStorage, date);

            expect(streak.currentCount).toEqual(1);
        })
        
        it('should reset if not consecutive', () => {
            const date = new Date(NEXT_DATE);
            const streak = streakCounter(mockLocalStorage, date);

            expect(streak.currentCount).toEqual(2);

            const update = new Date(LATER_DATE);
            const upStreak = streakCounter(mockLocalStorage, update);

            expect(upStreak.currentCount).toEqual(1);
        })
        
        it('should not reset on the same day login', () => {
            const date = new Date(NEXT_DATE);
            const streak = streakCounter(mockLocalStorage, date);

            expect(streak.currentCount).toEqual(2);

            const upStreak = streakCounter(mockLocalStorage, date);

            expect(upStreak.currentCount).toEqual(2);
        })
        
        it('should update the streak in localStorage', () => {
            const date = new Date(NEXT_DATE);
            
            streakCounter(mockLocalStorage, date);
            const storedValues = mockLocalStorage.getItem(STREAK_KEY);
            const local = JSON.parse(storedValues ?? '');

            expect(local.currentCount).toEqual(2);
            expect(local.lastLoginDate).toEqual(formatDate(date));
        })
        
        it('should reset the streak in localStorage', () => {
            const date = new Date(NEXT_DATE);
            
            streakCounter(mockLocalStorage, date);
            
            const update = new Date(LATER_DATE);
            streakCounter(mockLocalStorage, update);

            const storedValues = mockLocalStorage.getItem(STREAK_KEY);
            const local = JSON.parse(storedValues ?? '');

            expect(local.currentCount).toEqual(1);
            expect(local.lastLoginDate).toEqual(formatDate(update));
        })

        it('should not reset the streak in localStoragefor same day login', () => {
            const date = new Date(NEXT_DATE);
            
            streakCounter(mockLocalStorage, date);
            streakCounter(mockLocalStorage, date);

            const storedValues = mockLocalStorage.getItem(STREAK_KEY);
            const local = JSON.parse(storedValues ?? '');

            expect(local.currentCount).toEqual(2);
            expect(local.lastLoginDate).toEqual(formatDate(date));
        })

        afterEach(() => {
            mockLocalStorage.clear();
            loadedStreak = defaultStreak;
        })
    });

    afterEach(() => {
        mockLocalStorage.clear();
    });
})