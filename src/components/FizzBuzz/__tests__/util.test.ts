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

    const startOneOffset:number = 10e3
    clickStartOne = { type: 'start', datetime: new Date(testStart!.getTime() - startOneOffset) }
    const stopOneOffset:number = 7e3
    clickStopOne = { type: 'stop', datetime: new Date(testStart!.getTime() - stopOneOffset) }
    firstSetDif = startOneOffset - stopOneOffset

    const startTwoOffset: number = 5e3
    clickStartTwo = { type: 'start', datetime: new Date(testStart!.getTime() - startTwoOffset) }
    const stopTwoOffset: number = 3e3
    clickStopTwo = { type: 'stop', datetime: new Date(testStart!.getTime() - stopTwoOffset) }
    secondSetDif = startTwoOffset - stopTwoOffset
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
    expect(elapsedAtTime.elapsedMilliSecs).toEqual(expectedElapsedSeconds)
  })

  it('is stopped with multiple multiple clicks', () => {
    const isStopped: boolean = true
    const timerClicks: TimerClick[][] = [
      [clickStartOne!, clickStopOne!],
      [clickStartOne!, clickStopOne!, clickStartTwo!, clickStopTwo!]
    ]
    const expectedElapsedMilliSecs: number = (firstSetDif! + secondSetDif!)
    const elapsedMilliSecs: number = getElapsedAtTime(timerClicks, isStopped).elapsedMilliSecs
    expect(elapsedMilliSecs).toEqual(expectedElapsedMilliSecs)
  })

  it('is started with no stop clicks', () => {
    const isStopped:boolean = false
    const timerClicks = [
      [clickStartOne!, clickStopOne!],
      [clickStartOne!]
    ]
    const elapsedAtTime: ElapsedAtTime = getElapsedAtTime(timerClicks, isStopped)
    const lastStartClick = timerClicks[timerClicks.length - 1][0].datetime.getTime()
    const expectedElapsedMilliSecs:number = elapsedAtTime.atTime.getTime() - lastStartClick
    expect(elapsedAtTime.elapsedMilliSecs).toEqual(expectedElapsedMilliSecs)
  })

  it('should be started with multiple clicks', () => {
    const isStopped:boolean = false
    const timerClicks = [
      [clickStartOne!, clickStopOne!],
      [clickStartOne!, clickStopOne!, clickStartTwo!]
    ]
    const elapsedAtTime: ElapsedAtTime = getElapsedAtTime(timerClicks, isStopped)
    const lastStartClick = timerClicks[timerClicks.length - 1][2].datetime.getTime()
    const expectedElapsedMilliSecs:number = (elapsedAtTime.atTime.getTime() - lastStartClick) + firstSetDif!
    expect(elapsedAtTime.elapsedMilliSecs).toEqual(expectedElapsedMilliSecs)
  })
})

describe('time should be adjusted to reflect when the max elapsed time would be hit.', () => {
  /* Max Elapsed Milli Secs: 35999e3 */
  let atTime: Date | undefined
  beforeEach(() => {
    atTime = new Date()
  })

  afterEach(() => {
    atTime = undefined
  })

  it('should return the current time', () => {
    const elapsedMilliSeconds = 35999e3
    const adjustedTime = adjustStopTime(atTime!, elapsedMilliSeconds)
    expect(adjustedTime.getTime()).toEqual(atTime!.getTime())
  })

  it('should return a time in the past', () => {
    const elapsedMilliSecs = 36000e3
    const adjustedTime = adjustStopTime(atTime!, elapsedMilliSecs)
    expect(adjustedTime.getTime()).toBeLessThan(atTime!.getTime())
  })

  it('should return a time in the future', () => {
    const elapsedMilliSecs = 35998e3
    const adjustedTime = adjustStopTime(atTime!, elapsedMilliSecs)
    expect(adjustedTime.getTime()).toBeGreaterThan(atTime!.getTime())
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
