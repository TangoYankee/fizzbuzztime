import * as React from 'react'

import { FizzBuzz } from 'components/FizzBuzz'

type ValuesProps = {
  toggleValuesAreShown: FizzBuzz['toggleValuesAreShown'],
  fizzValue: number,
  buzzValue: number,
  updateValue: FizzBuzz['updateValue'],
  errorMessage: string
}

export const Values = ({ toggleValuesAreShown, fizzValue, buzzValue, updateValue, errorMessage }: ValuesProps) => {
  return (
    <div>
      <p>Please enter a fizz and buzz time in seconds. <strong>Values should be 2 to 10, inclusive</strong></p>
      <label>
        Fizz:
        <input type="text" id="fizzValue" name="fizzValue" value={fizzValue} onChange={updateValue} disabled={false} />
      </label>
      <label>
        Buzz:
        <input type="text" id="buzzValue" name="buzzValue" value={buzzValue} onChange={updateValue} disabled={false} />
      </label>
      <div>{errorMessage}</div>
      <button onClick={toggleValuesAreShown}>
        Go to Timer &gt;
      </button>
    </div>
  )
}
