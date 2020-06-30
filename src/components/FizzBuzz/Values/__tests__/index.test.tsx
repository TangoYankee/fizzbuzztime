import * as React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Values } from 'components/FizzBuzz/Values'
import { ValuesProps } from 'components/FizzBuzz/Values/types'
import { FizzBuzzErrorTypes } from 'components/FizzBuzz/types'

describe('<Values />', () => {
  it('should render without seeing the error message', () => {
    const defaultValuesProps: ValuesProps = {
      fizzValue: 2,
      buzzValue: 10,
      fizzBuzzError: { type: FizzBuzzErrorTypes.none, message: '' },
      toggleValuesAreShown () { },
      updateValue () { }
    }
    render(<Values {...defaultValuesProps} />)
    expect(screen.queryByText('invalid range')).toBeNull()
  })

  it('should render with an error message and a disabled button', () => {
    const defaultValuesProps: ValuesProps = {
      fizzValue: 12,
      buzzValue: 10,
      fizzBuzzError: { type: FizzBuzzErrorTypes.invalidRange, message: 'invalid range' },
      toggleValuesAreShown () { },
      updateValue () { }
    }
    render(<Values {...defaultValuesProps} />)
    screen.getByText('invalid range')
    expect(screen.getByRole('button', { name: 'Go to Timer >' })).toBeDisabled()
  })
})
