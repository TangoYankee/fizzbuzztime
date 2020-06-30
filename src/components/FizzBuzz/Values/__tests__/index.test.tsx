import * as React from 'react'
import '@testing-library/jest-dom'
import { render, RenderResult } from '@testing-library/react'
import { Values } from 'components/FizzBuzz/Values'
import { ValuesProps } from 'components/FizzBuzz/Values/types'
import { FizzBuzzErrorTypes } from 'components/FizzBuzz/types'

describe('<Values />', () => {
  beforeEach(() => {
    function renderValues (props: Partial<ValuesProps> = {}) {
      const defaultValuesProps: ValuesProps = {
        fizzValue: 2,
        buzzValue: 10,
        fizzBuzzError: { type: FizzBuzzErrorTypes.none, message: '' },
        toggleValuesAreShown () {

        },
        updateValue () {

        }
      }
      return render(<Values {...defaultValuesProps}{...props}/>)
    }
  })
  it.todo('renders Values')
})
