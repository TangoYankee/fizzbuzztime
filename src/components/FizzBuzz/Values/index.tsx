import * as React from 'react'

import 'components/FizzBuzz/Values/index.css'
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
    <div className="fizz-buzz-child-container values-container">
      <div className="values-instructions">Please enter a fizz and buzz time in seconds. <strong>Values should be 2 to 10, inclusive</strong></div>
      <div className="values-input-container">
        <label>
          Fizz:
          <input type="text" id="fizzValue" name="fizzValue" value={fizzValue} onChange={updateValue} />
        </label>
        <label>
          Buzz:
          <input type="text" id="buzzValue" name="buzzValue" value={buzzValue} onChange={updateValue} />
        </label>
      </div>
      <div className={`fizz-buzz-error ${fizzBuzzError.type !== FizzBuzzErrorTypes.none ? 'active' : ''}`}>{fizzBuzzError.message}</div>
      <button className="nav-btn" onClick={toggleValuesAreShown} disabled={fizzBuzzError.type === FizzBuzzErrorTypes.invalidRange}>
        Go to Timer &gt;
      </button>
    </div>
  )
}
