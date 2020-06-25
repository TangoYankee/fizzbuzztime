import * as React from 'react'

import { FizzBuzz } from 'components/FizzBuzz'

type ValuesProps = {
    toggleValuesAreShown: FizzBuzz['toggleValuesAreShown']
}

export const Values = ({ toggleValuesAreShown }: ValuesProps) => {
  return (
    <div>
      <h3>Values Component</h3>
      <button onClick={toggleValuesAreShown}>
                Go to Timer
      </button>
    </div>
  )
}
