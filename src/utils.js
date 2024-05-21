"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildStreak = exports.State = exports.STREAK_KEY = exports.formatDate = void 0;
function formatDate(date) {
    return date.toISOString();
}
exports.formatDate = formatDate;
exports.STREAK_KEY = 'streak';
var State;
(function (State) {
    State[State["INC"] = 0] = "INC";
    State[State["SAME"] = 1] = "SAME";
    State[State["RESET"] = 2] = "RESET";
})(State || (exports.State = State = {}));
;
function buildStreak(date, overrideDefaults) {
    const defaultStreak = {
        currentCount: 1,
        startDate: formatDate(date),
        lastLoginDate: formatDate(date)
    };
    return Object.assign(Object.assign({}, defaultStreak), overrideDefaults);
}
exports.buildStreak = buildStreak;
