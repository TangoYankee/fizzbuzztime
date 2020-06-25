import * as React from 'react'

import { Timer } from 'components/FizzBuzz/Timer'
import { Values } from 'components/FizzBuzz/Values'

type MyState = {
    valuesAreShown: boolean
}

export class FizzBuzz extends React.Component<{}, MyState> {
  constructor (props: any) {
    super(props)
    this.state = {
      valuesAreShown: true
    }
    this.toggleValuesAreShown = this.toggleValuesAreShown.bind(this)
  }

  toggleValuesAreShown () {
    this.setState({
      valuesAreShown: !this.state.valuesAreShown
    })
  }

  renderValues () {
    return (
      <Values toggleValuesAreShown={() => this.toggleValuesAreShown()} />
    )
  }

  renderTimer () {
    return (
      <Timer toggleValuesAreShown={() => this.toggleValuesAreShown()} />
    )
  }

  render () {
    return (
      <div>
        <h2>FizzBuzz Component</h2>
        {this.state.valuesAreShown ? this.renderValues() : this.renderTimer()}
      </div>
    )
  }
}
