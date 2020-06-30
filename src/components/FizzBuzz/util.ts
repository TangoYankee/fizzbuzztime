import { TimerClick, ElapsedAtTime } from 'components/FizzBuzz/types'

export const MaxElapsedMilliSecs: number = 35999e3

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
  const elapsedMilliSecs: number = stopTotals - startTotals
  return {
    elapsedMilliSecs: elapsedMilliSecs,
    atTime: currentTime
  }
}

export const adjustStopTime = (atTime: Date, elapsedMilliSecs: number): Date => {
  const adjustedStopMilliSecs: number = atTime.getTime() - (elapsedMilliSecs - MaxElapsedMilliSecs)
  return new Date(adjustedStopMilliSecs)
}

export const areValuesValid = (fizzValue: number, buzzValue: number) => {
  return fizzValue >= 2 && buzzValue >= 2 && fizzValue <= 10 && buzzValue <= 10
}
