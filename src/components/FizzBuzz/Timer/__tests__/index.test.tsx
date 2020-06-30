import * as React from 'react'
import { Timer } from 'components/FizzBuzz/Timer'
import { TimerProps } from 'components/FizzBuzz/Timer/types'
import { render, screen, fireEvent, waitForElement } from '@testing-library/react'

function renderTimer (props: Partial<TimerProps> = {}) {
  const defaultProps: TimerProps = {
    toggleValuesAreShown () { },
    updateTimerClicks () { },
    timerClicks: [[]],
    isStopped: true,
    fizzValue: 2,
    buzzValue: 10
  }
  return (render(<Timer {...defaultProps} {...props} />))
}

describe('<Timer />', () => {
  it('render Timer', () => {
    renderTimer()
    screen.getByText('0:00:00')
  })
})
