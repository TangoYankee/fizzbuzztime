import { TimerClick } from 'components/FizzBuzz/types'

export const MaxElapsedSeconds: number = 35999

export interface ElapsedAtTime {
  elapsedSeconds: number
  atTime: Date
}

export const getElapsedAtTime = (timerClicks: TimerClick[][], isStopped: boolean): ElapsedAtTime => {
  const currentTimer: TimerClick[] = timerClicks[timerClicks.length - 1]
  var startTotals: number = 0
  var stopTotals: number = 0
  for (const timerClick of currentTimer) {
    timerClick.type === 'start' && (startTotals += timerClick.datetime.getTime())
    timerClick.type === 'stop' && (stopTotals += timerClick.datetime.getTime())
  }
  const currentTime: Date = new Date()
  isStopped || (stopTotals += currentTime.getTime())
  const elapsedSeconds: number = Math.floor((stopTotals - startTotals) / 1000)
  return {
    elapsedSeconds: elapsedSeconds,
    atTime: currentTime
  }
}

export const adjustStopTime = (atTime: Date, elapsedSeconds: number): Date => {
  const adjustedStopSeconds: number = Math.floor(atTime.getTime() / 1000) - (elapsedSeconds - MaxElapsedSeconds)
  return new Date(adjustedStopSeconds * 1000)
}

export const areValuesValid = (fizzValue: number, buzzValue: number) => {
  return fizzValue >= 2 && buzzValue >= 2 && fizzValue <= 10 && buzzValue <= 10
}
