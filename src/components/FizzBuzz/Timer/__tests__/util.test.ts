import { formatTime, getFizzBuzzText } from '../util'

describe('integer of elapsed seconds formatted into string', () => {
  it('should be zero', () => { expect(formatTime(0)).toEqual('0:00:00') })
  it('should be 2 min and 9 seconds', () => { expect(formatTime(129)).toEqual('0:02:09') })
  it('should be 1 hr, 9min, and 10 seconds ', () => { expect(formatTime(4150)).toEqual('1:09:10') })
  it('should be 10 hrs, 59min, and 59seconds', () => { expect(formatTime(39599)).toEqual('10:59:59') })
})

describe('fizzbuzz text', () => {
  it('returns niether fizz nor buzz at zero seconds', () => {
    const elapsedSeconds:number = 0
    const fizzValue:number = 5
    const buzzValue:number = 5
    expect(getFizzBuzzText(elapsedSeconds, fizzValue, buzzValue)).toEqual('')
  })
  it('returns fizzbuzz when fizz and buzz are equal', () => {
    const elapsedSeconds:number = 100
    const fizzValue:number = 10
    const buzzValue:number = 10
    expect(getFizzBuzzText(elapsedSeconds, fizzValue, buzzValue)).toEqual('FizzBuzz')
  })
  it('returns neither fizz nor buzz when above zero', () => {
    const elapsedSeconds:number = 100
    const fizzValue:number = 3
    const buzzValue = 7
    expect(getFizzBuzzText(elapsedSeconds, fizzValue, buzzValue)).toEqual('')
  })
  it('returns fizz', () => {
    const elapsedSeconds:number = 100
    const fizzValue:number = 2
    const buzzValue:number = 7
    expect(getFizzBuzzText(elapsedSeconds, fizzValue, buzzValue)).toEqual('Fizz')
  })

  it('returns buzz', () => {
    const elapsedSeconds:number = 100
    const fizzValue: number = 3
    const buzzValue: number = 5
    expect(getFizzBuzzText(elapsedSeconds, fizzValue, buzzValue)).toEqual('Buzz')
  })
})
