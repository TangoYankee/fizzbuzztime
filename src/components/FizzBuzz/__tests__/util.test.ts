import { getElapsedAtTime, adjustStopTime, areValuesValid } from '../util'
import { TimerClick, ElapsedAtTime } from '../types'

describe('calculate how much time has passed', () => {
  let testStart: Date | undefined
  let clickStartOne: TimerClick | undefined
  let clickStopOne: TimerClick | undefined
  let clickStartTwo: TimerClick | undefined
  let clickStopTwo: TimerClick | undefined
  let firstSetDif: number | undefined
  let secondSetDif: number | undefined

  beforeEach(() => {
    testStart = new Date()

    const startOneOffset:number = 10000
    clickStartOne = { type: 'start', datetime: new Date(testStart!.getTime() - startOneOffset) }
    const stopOneOffset:number = 7000
    clickStopOne = { type: 'stop', datetime: new Date(testStart!.getTime() - stopOneOffset) }
    firstSetDif = Math.floor((startOneOffset - stopOneOffset) / 1000)

    const startTwoOffset: number = 5000
    clickStartTwo = { type: 'start', datetime: new Date(testStart!.getTime() - startTwoOffset) }
    const stopTwoOffset: number = 3000
    clickStopTwo = { type: 'stop', datetime: new Date(testStart!.getTime() - stopTwoOffset) }
    secondSetDif = Math.floor((startTwoOffset - stopTwoOffset) / 1000)
  })

  afterEach(() => {
    testStart = undefined
    clickStartOne = undefined
    clickStopOne = undefined
    clickStartTwo = undefined
    clickStopTwo = undefined
    firstSetDif = undefined
    secondSetDif = undefined
  })

  it('should be stopped with no clicks', () => {
    const isStopped: boolean = true
    const timerClicks: TimerClick[][] = [
      [clickStartOne!, clickStopOne!],
      []
    ]
    const expectedElapsedSeconds: number = (0)
    const elapsedAtTime: ElapsedAtTime = getElapsedAtTime(timerClicks, isStopped)
    expect(elapsedAtTime.elapsedSeconds).toEqual(expectedElapsedSeconds)
  })

  it('is stopped with multiple multiple clicks', () => {
    const isStopped: boolean = true
    const timerClicks: TimerClick[][] = [
      [clickStartOne!, clickStopOne!],
      [clickStartOne!, clickStopOne!, clickStartTwo!, clickStopTwo!]
    ]
    const expectedElapsedSeconds: number = (firstSetDif! + secondSetDif!)
    const elapsedSeconds: number = getElapsedAtTime(timerClicks, isStopped).elapsedSeconds
    expect(elapsedSeconds).toEqual(expectedElapsedSeconds)
  })

  it('is started with no stop clicks', () => {
    const isStopped:boolean = false
    const timerClicks = [
      [clickStartOne!, clickStopOne!],
      [clickStartOne!]
    ]
    const elapsedAtTime: ElapsedAtTime = getElapsedAtTime(timerClicks, isStopped)
    const lastStartClickInSecs = Math.floor(timerClicks[timerClicks.length - 1][0].datetime.getTime() / 1000)
    const expectedElapsedSeconds:number = Math.floor(elapsedAtTime.atTime.getTime() / 1000) - lastStartClickInSecs
    expect(elapsedAtTime.elapsedSeconds).toEqual(expectedElapsedSeconds)
  })

  it('should be started with multiple clicks', () => {
    const isStopped:boolean = false
    const timerClicks = [
      [clickStartOne!, clickStopOne!],
      [clickStartOne!, clickStopOne!, clickStartTwo!]
    ]
    const elapsedAtTime: ElapsedAtTime = getElapsedAtTime(timerClicks, isStopped)
    const lastStartClickInSecs = Math.floor(timerClicks[timerClicks.length - 1][2].datetime.getTime() / 1000)
    const expectedElapsedSeconds:number = (Math.floor(elapsedAtTime.atTime.getTime() / 1000) - lastStartClickInSecs) + firstSetDif!
    expect(elapsedAtTime.elapsedSeconds).toEqual(expectedElapsedSeconds)
  })
})

describe('time should be adjusted to reflect when the max elapsed time would be hit.', () => {
  /* Max Elapsed Seconds: 35999 */
  let atTime: Date | undefined
  let atTimeSeconds: number | undefined
  beforeEach(() => {
    atTime = new Date()
    atTimeSeconds = Math.floor(atTime!.getTime() / 1000)
  })

  afterEach(() => {
    atTime = undefined
    atTimeSeconds = undefined
  })

  it('should return the current time', () => {
    const elapsedSeconds = 35999
    const adjustedTime = adjustStopTime(atTime!, elapsedSeconds)
    const adjustedSeconds = Math.floor(adjustedTime.getTime() / 1000)
    expect(adjustedSeconds).toEqual(atTimeSeconds!)
  })

  it('should return a time in the past', () => {
    const elapsedSeconds = 36000
    const adjustedTime = adjustStopTime(atTime!, elapsedSeconds)
    const adjustedSeconds = Math.floor(adjustedTime.getTime() / 1000)
    expect(adjustedSeconds).toBeLessThan(atTimeSeconds!)
  })

  it('should return a time in the future', () => {
    const elapsedSeconds = 35998
    const adjustedTime = adjustStopTime(atTime!, elapsedSeconds)
    const adjustedSeconds = Math.floor(adjustedTime.getTime() / 1000)
    expect(adjustedSeconds).toBeGreaterThan(atTimeSeconds!)
  })
})

describe('are fizz and buzz valid', () => {
  it('should be valid', () => {
    const fizz: number = 2
    const buzz: number = 10
    expect(areValuesValid(fizz, buzz)).toBe(true)
  })

  it('should be valid with fizz buzz equal', () => {
    const fizz: number = 5
    const buzz: number = 5
    expect(areValuesValid(fizz, buzz)).toBe(true)
  })

  it('should be invalid from low  fizz', () => {
    const fizz: number = 1
    const buzz: number = 10
    expect(areValuesValid(fizz, buzz)).toBe(false)
  })

  it('should be invalid from low buzz', () => {
    const fizz: number = 2
    const buzz: number = 0
    expect(areValuesValid(fizz, buzz)).toBe(false)
  })

  it('should be invalid from high fizz', () => {
    const fizz: number = 11
    const buzz: number = 10
    expect(areValuesValid(fizz, buzz)).toBe(false)
  })

  it('should be invalid from high buzz', () => {
    const fizz: number = 2
    const buzz: number = 11
    expect(areValuesValid(fizz, buzz)).toBe(false)
  })
})
