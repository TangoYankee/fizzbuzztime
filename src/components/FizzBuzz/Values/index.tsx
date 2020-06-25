import * as React from 'react'

import { FizzBuzz } from 'components/FizzBuzz'

type ValuesProps = {
  toggleValuesAreShown: FizzBuzz['toggleValuesAreShown'],
  fizzValue: number,
  buzzValue: number,
  updateFizz: FizzBuzz['updateFizz'],
  updateBuzz: FizzBuzz['updateBuzz']
}

export const Values = ({ toggleValuesAreShown, fizzValue, buzzValue, updateFizz, updateBuzz }: ValuesProps) => {
  return (
    <div>
      <p>Please enter a fizz and buzz time in seconds. <strong>Values should be 2 to 10, inclusive</strong></p>
      <label>
        Fizz:
        <input type="text" id="fizzValue" name="fizzValue" value={fizzValue} onChange={updateFizz} disabled={false}/>
      </label>
      <label>
        Buzz:
        <input type="text" id="buzzValue" name="buzzValue" value={buzzValue} onChange={updateBuzz} disabled={false}/>
      </label>
      <button onClick={toggleValuesAreShown}>
        Go to Timer &gt;
      </button>
    </div>
  )
}
