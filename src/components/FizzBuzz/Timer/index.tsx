import * as React from 'react'

import { FizzBuzz } from 'components/FizzBuzz'

type TimerProps = {
    toggleValuesAreShown: FizzBuzz['toggleValuesAreShown']
}

export const Timer = ({ toggleValuesAreShown }: TimerProps) => {
  return (
    <div>
      <h3>Timer Component</h3>
      <button onClick={toggleValuesAreShown}>
            &lt; Set Times
      </button>
    </div>
  )
}
