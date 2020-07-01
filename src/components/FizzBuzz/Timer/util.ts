export const updateInterval: number = 25
/* 1/25 milliseconds is the slowest update rate without noticeable lag in mounting timer. */

export const formatTime = (elapsedMilliSecs: number): string => {
  /* Desired time format: h:mm:ss.
  Convert milliseconds to seconds in a way that will match FizzBuzz text.
  Start with largest unit (hours) and work to smallest (seconds).
  Find how many times unit fully goes into elapsed time.
  Take the remaining time and see how many times the next unit goes into it. */
  const elapsedSecs:number = Math.floor(elapsedMilliSecs / 1e3)
  const hrs: number = Math.floor(elapsedSecs / 3600)
  const hrsInSecs: number = hrs * 3600
  const minutes: number = Math.floor((elapsedSecs - (hrsInSecs)) / 60)
  const seconds: number = (elapsedSecs - (hrsInSecs) - (minutes * 60))
  const minutesFormat: string = minutes < 10 ? `0${minutes}` : `${minutes}`
  const secondsFormat: string = seconds < 10 ? `0${seconds}` : `${seconds}`
  return `${hrs}:${minutesFormat}:${secondsFormat}`
}

export const getFizzBuzzText = (elapsedMilliSecs: number, fizzValue: number, buzzValue: number): string => {
  /* Fizz, Buzz, or FizzBuzz text based on whether it is a multiple of elapsed time.
    Date is recorded to nearest millisecond and text is calculated from seconds.
    Milliseconds are converted to seconds by dividing by 1000 and rounding down. */
  const elapsedSecs: number = Math.floor(elapsedMilliSecs / 1e3)
  if (elapsedSecs === 0) return ''
  const isFizz = (elapsedSecs % fizzValue === 0)
  const isBuzz = (elapsedSecs % buzzValue === 0)
  if (isFizz && isBuzz) return 'FizzBuzz'
  else if (isFizz) return 'Fizz'
  else if (isBuzz) return 'Buzz'
  return ''
}
