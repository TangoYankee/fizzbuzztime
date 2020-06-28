export const formatTime = (elapsedSeconds: number): string => {
  const hrs: number = Math.floor(elapsedSeconds / 3600)
  const hrsInSecs: number = hrs * 3600
  const minutes: number = Math.floor((elapsedSeconds - (hrsInSecs)) / 60)
  const seconds: number = (elapsedSeconds - (hrsInSecs) - (minutes * 60))
  const minutesFormat: string = minutes < 10 ? `0${minutes}` : `${minutes}`
  const secondsFormat: string = seconds < 10 ? `0${seconds}` : `${seconds}`
  return `${hrs}:${minutesFormat}:${secondsFormat}`
}

export const getFizzBuzzText = (elapsedSeconds: number, fizzValue: number, buzzValue: number): string => {
  if (elapsedSeconds === 0) return ''
  const isFizz = (elapsedSeconds % fizzValue === 0)
  const isBuzz = (elapsedSeconds % buzzValue === 0)
  if (isFizz && isBuzz) return 'FizzBuzz'
  else if (isFizz) return 'Fizz'
  else if (isBuzz) return 'Buzz'
  return ''
}
