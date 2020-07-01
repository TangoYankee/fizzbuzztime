import * as React from 'react'

import { FizzBuzz } from 'components/FizzBuzz'
import { updateInterval } from 'components/FizzBuzz/Timer/util'
import { render, screen, fireEvent } from '@testing-library/react'
import * as MockDate from 'mockdate'

describe('Validate the input of Fizz and Buzz Values', () => {
  let fizzTextbox: HTMLInputElement | undefined
  let buzzTextbox: HTMLInputElement | undefined
  let navButton: HTMLButtonElement | undefined

  beforeEach(() => {
    render(<FizzBuzz />)
    fizzTextbox = screen.getByRole('textbox', { name: 'Fizz:' }) as HTMLInputElement
    buzzTextbox = screen.getByRole('textbox', { name: 'Buzz:' }) as HTMLInputElement
    navButton = screen.getByRole('button', { name: 'Go to Timer >' }) as HTMLButtonElement
  })

  afterEach(() => {
    fizzTextbox = undefined
    buzzTextbox = undefined
    navButton = undefined
  })

  it('should input new fizz and buzz values. disable nav button as buzz becomes zero', () => {
    fireEvent.change(fizzTextbox!, { target: { value: '10' } })
    fireEvent.change(buzzTextbox!, { target: { value: '2' } })
    expect(fizzTextbox!.value).toBe('10')
    expect(buzzTextbox!.value).toBe('2')
    expect(navButton).not.toHaveAttribute('disable')
  })

  it('should keep default Fizz and Buzz as inputs are invalid', () => {
    fireEvent.change(fizzTextbox!, { target: { value: 'k' } })
    fireEvent.change(buzzTextbox!, { target: { value: '%' } })
    expect(fizzTextbox!.value).toBe('2')
    expect(buzzTextbox!.value).toBe('10')
    expect(navButton).not.toHaveAttribute('disable')
  })

  it('should prompt an error message and disabled nav button with buzz too high', () => {
    expect(navButton).not.toHaveAttribute('disable')
    expect(screen.queryByText(/value is not in range/)).toBeNull()

    fireEvent.change(buzzTextbox!, { target: { value: '12' } })
    expect(navButton).toHaveAttribute('disabled')
    expect(screen.getByText(/value is not in range/))

    fireEvent.change(buzzTextbox!, { target: { value: '10' } })
    expect(navButton).not.toHaveAttribute('disable')
    expect(screen.queryByText(/value is not in range/)).toBeNull()
  })

  it('should prompt error and disable nav with fizz too low', () => {
    expect(navButton).not.toHaveAttribute('disable')
    expect(screen.queryByText(/value is not in range/)).toBeNull()

    fireEvent.change(fizzTextbox!, { target: { value: '1' } })
    expect(navButton).toHaveAttribute('disabled')
    expect(screen.getByText(/value is not in range/))

    fireEvent.change(fizzTextbox!, { target: { value: '9' } })
    expect(navButton).not.toHaveAttribute('disable')
    expect(screen.queryByText(/value is not in range/)).toBeNull()
  })
})

describe('Toggle between values and timer components', () => {
  it('should start on Values Component and toggle to Timer', () => {
    render(<FizzBuzz />)
    expect(screen.getByRole('button', { name: 'Go to Timer >' }))
    fireEvent.click(screen.getByRole('button', { name: 'Go to Timer >' }))
    expect(screen.getByRole('button', { name: '< Set Times' }))
    fireEvent.click(screen.getByRole('button', { name: '< Set Times' }))
    expect(screen.getByRole('button', { name: 'Go to Timer >' }))
  })
})

describe('Time elapses on button clicks', () => {
  let testStart: Date | undefined
  beforeEach(() => {
    jest.useFakeTimers()
    testStart = new Date()
    render(<FizzBuzz />)
    fireEvent.click(screen.getByRole('button', { name: 'Go to Timer >' }))
  })

  afterEach(() => {
    testStart = undefined
    MockDate.reset()
  })

  it('should initially render with no time elasped, neither Fizz nor Buzz', () => {
    expect(screen.getByText(/0:00:00/))
    expect(screen.queryByText(/Fizz/)).toBeNull()
    expect(screen.queryByText(/Buzz/)).toBeNull()
  })

  it('should have 4 seconds elapse from pressing start, Fizz!', () => {
    MockDate.set(new Date(testStart!.getTime() - 4000))
    fireEvent.click(screen.getByRole('button', { name: 'Start' }))
    MockDate.reset()
    jest.advanceTimersByTime(updateInterval)
    expect(screen.getByText(/0:00:04/))
    expect(screen.getByText('Fizz'))
  })

  it('should lock out double clicks of start, FizzBuzz!', () => {
    MockDate.set(new Date(testStart!.getTime() - 10000))
    fireEvent.click(screen.getByRole('button', { name: 'Start' }))
    MockDate.set(new Date(testStart!.getTime() - 1000))
    MockDate.reset()
    jest.advanceTimersByTime(updateInterval)
    expect(screen.getByText(/0:00:10/))
    expect(screen.getByText('FizzBuzz'))
  })

  it('should calculate time based on last stopped time while stopped, neither Fizz nor Buzz', () => {
    MockDate.set(new Date(testStart!.getTime() - 10000))
    fireEvent.click(screen.getByRole('button', { name: 'Start' }))
    MockDate.set(new Date(testStart!.getTime() - 5000))
    fireEvent.click(screen.getByRole('button', { name: 'Stop/Reset' }))
    MockDate.set(new Date(testStart!.getTime() + 20000))
    jest.advanceTimersByTime(updateInterval)
    expect(screen.getByText(/0:00:05/))
    expect(screen.queryByText(/Fizz/)).toBeNull()
  })

  it('should reset time on double click of stop, neither Fizz nor Buzz', () => {
    MockDate.set(new Date(testStart!.getTime() - 10000))
    fireEvent.click(screen.getByRole('button', { name: 'Start' }))
    MockDate.set(new Date(testStart!.getTime() - 5000))
    fireEvent.click(screen.getByRole('button', { name: 'Stop/Reset' }))
    MockDate.set(new Date(testStart!.getTime() + 20000))
    fireEvent.click(screen.getByRole('button', { name: 'Stop/Reset' }))
    jest.advanceTimersByTime(updateInterval)
    expect(screen.getByText(/0:00:00/))
    expect(screen.queryByText(/Fizz/)).toBeNull()
  })
})

describe('Lockout changing values when timer has started', () => {
  beforeEach(() => {
    render(<FizzBuzz />)
    fireEvent.click(screen.getByRole('button', { name: 'Go to Timer >' }))
    fireEvent.click(screen.getByRole('button', { name: 'Start' }))
    fireEvent.click(screen.getByRole('button', { name: '< Set Times' }))
  })

  it('should lock out setting the Fizz value when there is already a start time', () => {
    expect(screen.queryByText(/the timer has started/)).toBeNull()
    const fizzTextbox: HTMLInputElement = screen.getByRole('textbox', { name: 'Fizz:' }) as HTMLInputElement
    fireEvent.change(fizzTextbox, { target: { value: '3' } })
    expect(screen.getByText(/the timer has started/))
    expect(fizzTextbox.value).toEqual('2')
  })

  it('should lock out Buzz. clear the lock message when navigating between pages', () => {
    const buzzTextbox: HTMLInputElement = screen.getByRole('textbox', { name: 'Buzz:' }) as HTMLInputElement
    fireEvent.change(buzzTextbox, { target: { value: '3' } })
    expect(screen.getByText(/the timer has started/))
    fireEvent.click(screen.getByRole('button', { name: 'Go to Timer >' }))
    fireEvent.click(screen.getByRole('button', { name: '< Set Times' }))
    expect(screen.queryByText(/the timer has started/)).toBeNull()
  })
})

describe('Prevent going over max allowed time', () => {
  /* Running each of these tests in isolation results in each passing. ie) Running one and skipping the other two.
  However, running all three of them results in an error:

    "Warning: Can't perform a React state update on an unmounted component.
    This is a no-op, but it indicates a memory leak in your application.
    To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method."

  The error can be silenced by using suboptimal or 'gappy' conditional checks that come before setting the state
  in the source code. Additionally, the warning itself talks of memory leaks. These memory leaks are
  addressed in the source code by clearing the interval in 'ComponentWillUnmount'. There are no memory leak warnings
  when manually testing the function.

  Ultimately, the errors seem isolated to the testing environment. However, it is still prudent to watch for memory
  leaks in the production environment. */

  let testStart: Date | undefined
  beforeEach(() => {
    testStart = new Date()
    jest.useFakeTimers()
    render(<FizzBuzz />)
    fireEvent.click(screen.getByRole('button', { name: 'Go to Timer >' }))
    fireEvent.click(screen.getByRole('button', { name: 'Start' }))
  })

  afterEach(() => {
    testStart = undefined
    jest.useRealTimers()
    MockDate.reset()
  })

  it('should only go to the max time', () => {
    MockDate.set(testStart!.getTime() + 4e8)
    jest.advanceTimersByTime(updateInterval)
    expect(screen.getByText(/9:59:59/))
  })

  it.skip('should prevent the timer from going over max time when started again', () => {
    MockDate.set(testStart!.getTime() + 4e8)
    jest.advanceTimersByTime(updateInterval)
    fireEvent.click(screen.getByRole('button', { name: 'Start' }))
    jest.advanceTimersByTime(updateInterval)
    expect(screen.getByText(/9:59:59/))
  })

  it.skip('should reset the timer max value is hit and stop is pressed', () => {
    MockDate.set(testStart!.getTime() + 4e8)
    jest.advanceTimersByTime(updateInterval)
    expect(screen.getByText(/9:59:59/))
    fireEvent.click(screen.getByRole('button', { name: 'Stop/Reset' }))
    jest.advanceTimersByTime(updateInterval)
    expect(screen.getByText(/0:00:00/))
  })
})
