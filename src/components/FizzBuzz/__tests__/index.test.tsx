import * as React from 'react'

import { FizzBuzz } from 'components/FizzBuzz'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<FizzBuzz  />', () => {
  it('should start on Values Component and toggle to Timer', () => {
    render(<FizzBuzz />)
    fireEvent.click(screen.getByRole('button', { name: 'Go to Timer >' }))
    screen.getByRole('button', { name: '< Set Times' })
  })

  it('should input a new fizz value', () => {
    render(<FizzBuzz />)
    fireEvent.change(screen.getByRole('textbox', { name: 'Fizz:' }), { target: { value: 5 } })
    screen.debug()
  })
})
