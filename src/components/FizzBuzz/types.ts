export interface ElapsedAtTime {
    elapsedSeconds: number
    atTime: Date
  }

export interface TimerClick {
    type: string,
    datetime: Date
}

export enum FizzBuzzErrorTypes {
    none = 'none',
    invalidRange = 'invalidRange',
    timerStarted = 'timerStarted'
}

export interface FizzBuzzError {
    type: FizzBuzzErrorTypes,
    message: string
}

export type FizzBuzzState = {
    valuesAreShown: boolean
    fizzValue: number
    buzzValue: number
    timerClicks: TimerClick[][]
    isStopped: boolean
    fizzBuzzError: FizzBuzzError
}
