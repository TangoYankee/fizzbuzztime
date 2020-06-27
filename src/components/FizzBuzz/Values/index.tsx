import * as React from 'react'

import { FizzBuzz, FizzBuzzError, FizzBuzzErrorTypes } from 'components/FizzBuzz'

type ValuesProps = {
  toggleValuesAreShown: FizzBuzz['toggleValuesAreShown'],
  fizzValue: number,
  buzzValue: number,
  updateValue: FizzBuzz['updateValue'],
  fizzBuzzError: FizzBuzzError
}

export const Values = ({ toggleValuesAreShown, fizzValue, buzzValue, updateValue, fizzBuzzError }: ValuesProps) => {
  return (
    <div>
      <p>Please enter a fizz and buzz time in seconds. <strong>Values should be 2 to 10, inclusive</strong></p>
      <label>
        Fizz:
        <input type="text" id="fizzValue" name="fizzValue" value={fizzValue} onChange={updateValue} />
      </label>
      <label>
        Buzz:
        <input type="text" id="buzzValue" name="buzzValue" value={buzzValue} onChange={updateValue} />
      </label>
      <div>{fizzBuzzError.message}</div>
      <button onClick={toggleValuesAreShown}disabled={fizzBuzzError.type === FizzBuzzErrorTypes.invalidRange}>
        Go to Timer &gt;
      </button>
    </div>
  )
}
