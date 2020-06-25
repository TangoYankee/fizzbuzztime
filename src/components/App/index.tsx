import * as React from 'react'

import { FizzBuzz } from 'components/FizzBuzz'

export const App: React.FunctionComponent = () => {
    return (
        <div>
            <h1>App Component</h1>
            <FizzBuzz />
        </div>
    )
}
