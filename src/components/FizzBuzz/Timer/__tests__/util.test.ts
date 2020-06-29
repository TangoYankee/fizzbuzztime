import { formatTime } from '../util'

describe('integer of elapsed seconds formatted into string', () => {
  it('should be zero', () => { expect(formatTime(0)).toEqual('0:00:00') })
  it('should be 2 min and 9 seconds', () => { expect(formatTime(129)).toEqual('0:02:09') })
  it('should be 1 hr, 9min, and 10 seconds ', () => { expect(formatTime(4150)).toEqual('1:09:10') })
  it('should be 10 hrs, 59min, and 59seconds', () => { expect(formatTime(39599)).toEqual('10:59:59') })
})
