import { TimerClick, ElapsedAtTime } from 'components/FizzBuzz/types'

export const MaxElapsedMilliSecs: number = 35999e3
/* Timer should not exceed 9:59:59 */

export const getElapsedAtTime = (timerClicks: TimerClick[][], isStopped: boolean): ElapsedAtTime => {
  /* Elapsed time is difference in all the listed start times and all the listed stopped times.
  When the timer is running, the current time takes the place of a final stop time.
  Current time is recorded for possible future adjustment. */
  const currentTimer: TimerClick[] = timerClicks[timerClicks.length - 1]
  var startTotals: number = 0
  var stopTotals: number = 0
  for (const timerClick of currentTimer) {
    const type:string = timerClick.type
    const time:number = timerClick.datetime.getTime()
    type === 'start' && (startTotals += time)
    type === 'stop' && (stopTotals += time)
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
  /* Take the date when the elapsed time was recorded.
  Change it to match the date when the max elapsed time would have been reached. */
  const adjustedStopMilliSecs: number = atTime.getTime() - (elapsedMilliSecs - MaxElapsedMilliSecs)
  return new Date(adjustedStopMilliSecs)
}

export const areValuesValid = (fizzValue: number, buzzValue: number) => {
  /* fizz and buzz values should be 2 to 10, inclusive */
  return fizzValue >= 2 && buzzValue >= 2 && fizzValue <= 10 && buzzValue <= 10
}
