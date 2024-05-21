# `@dh2/streaker` - A basic streak counter

This is a basic streak counter - inspired by Duolingo - written in TypeScript and meant for the browser (using `localStorage`)

##Install

```shell
yarn add @dh2/streaker
```

```shell
npm install @dh2/streaker
```

##Usage
```TypeScript
import { streakCounter } from '@dh2/streaker'

const today= new Date();
const streak = streakCounter(localStorage, today);

// streak returns and object:
// {
//     currentCount: 1,
//     lastLoginDate: "05/13/2024",
//     startDate: "05/13/2024",
// }
```

##Course differentiations
- Mostly followed the course
- Refactor wasn't really needed
- Used and Enum instead of string literals
- overwrote streak from default as we went
- added ignoring of __test__ folder in compilation