import * as React from 'react'

import { FizzBuzz } from 'components/FizzBuzz'
import { render, screen, fireEvent } from '@testing-library/react'
import * as MockDate from 'mockdate'

describe('<FizzBuzz /> <Values />', () => {
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

describe('Toggle <Values /> and <Timer />', () => {
  it('should start on Values Component and toggle to Timer', () => {
    render(<FizzBuzz />)
    expect(screen.getByRole('button', { name: 'Go to Timer >' }))
    fireEvent.click(screen.getByRole('button', { name: 'Go to Timer >' }))
    expect(screen.getByRole('button', { name: '< Set Times' }))
    fireEvent.click(screen.getByRole('button', { name: '< Set Times' }))
    expect(screen.getByRole('button', { name: 'Go to Timer >' }))
  })
})

describe('<Timer />', () => {
  let testStart:Date | undefined
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

  it('should initially render with no time elasped', () => {
    expect(screen.getByText(/0:00:00/))
  })

  it('should have 4 seconds elapse from pressing start', () => {
    const pastDate:Date = new Date(testStart!.getTime() - 4000)
    MockDate.set(pastDate)
    fireEvent.click(screen.getByRole('button', { name: 'Start' }))
    MockDate.reset()
    jest.advanceTimersByTime(25)
    expect(screen.getByText(/0:00:04/))
  })
})
