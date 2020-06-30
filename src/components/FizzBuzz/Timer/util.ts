export const formatTime = (elapsedMilliSecs: number): string => {
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
  const elapsedSecs: number = Math.floor(elapsedMilliSecs / 1e3)
  if (elapsedSecs === 0) return ''
  const isFizz = (elapsedSecs % fizzValue === 0)
  const isBuzz = (elapsedSecs % buzzValue === 0)
  if (isFizz && isBuzz) return 'FizzBuzz'
  else if (isFizz) return 'Fizz'
  else if (isBuzz) return 'Buzz'
  return ''
}
