"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streakCounter = exports.dateDiff = void 0;
const utils_1 = require("./utils");
function dateDiff(dateLeft, dateRight) {
    const diffTime = Math.abs(dateLeft.getTime() - dateRight.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
exports.dateDiff = dateDiff;
function defineState(currDate, lastLogin) {
    const diff = dateDiff(new Date(lastLogin), currDate);
    if (diff > 1) {
        return utils_1.State.RESET;
    }
    if (diff === 1) {
        return utils_1.State.INC;
    }
    return utils_1.State.SAME;
}
function streakCounter(storage, date) {
    const storageValues = storage.getItem(utils_1.STREAK_KEY);
    let streak = (0, utils_1.buildStreak)(date);
    if (storageValues) {
        try {
            const parsedStreak = JSON.parse(storageValues);
            const currStreak = (0, utils_1.buildStreak)(date, parsedStreak);
            const state = defineState(date, currStreak.lastLoginDate);
            if (state === utils_1.State.SAME) {
                return currStreak;
            }
            else if (state === utils_1.State.INC) {
                streak = (0, utils_1.buildStreak)(date, Object.assign(Object.assign({}, currStreak), { currentCount: Number(streak.currentCount) + 1, lastLoginDate: (0, utils_1.formatDate)(date) }));
            }
        }
        catch (error) {
            console.error("Failed to parse streak from localStorage");
        }
    }
    storage.setItem(utils_1.STREAK_KEY, JSON.stringify(streak));
    return streak;
}
exports.streakCounter = streakCounter;
