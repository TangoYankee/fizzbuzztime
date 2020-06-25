import * as React from 'react'

import { Timer } from 'components/FizzBuzz/Timer'
import { Values} from 'components/FizzBuzz/Values'

export const FizzBuzz: React.FunctionComponent = () => {
    return (
        <div>
            <h2>FizzBuzz Component</h2>
            <Timer />
            <Values />
        </div>
    )
}