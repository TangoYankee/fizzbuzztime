export const formatTime = (elapsedSeconds:number):string => {
  const hours:number = Math.floor(elapsedSeconds / 3600)
  const minutes:number = Math.floor((elapsedSeconds - (hours * 3600)) / 60)
  const seconds:number = (elapsedSeconds - (hours * 3600) - (minutes * 60))
  const minutesFormat:string = minutes < 10 ? `0${minutes}` : `${minutes}`
  const secondsFormat:string = seconds < 10 ? `0${seconds}` : `${seconds}`
  return `${hours}:${minutesFormat}:${secondsFormat}`
}
