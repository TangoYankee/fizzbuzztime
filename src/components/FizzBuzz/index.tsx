import * as React from 'react'

import { Timer } from 'components/FizzBuzz/Timer'
import { Values } from 'components/FizzBuzz/Values'

type FizzBuzzState = {
  valuesAreShown: boolean
  fizzValue: number
  buzzValue: number
}

export class FizzBuzz extends React.Component<{}, FizzBuzzState> {
  constructor (props: any) {
    super(props)
    this.state = {
      valuesAreShown: true,
      fizzValue: 2,
      buzzValue: 10
    }
    this.toggleValuesAreShown = this.toggleValuesAreShown.bind(this)
    this.updateFizz = this.updateFizz.bind(this)
    this.updateBuzz = this.updateBuzz.bind(this)
  }

  toggleValuesAreShown () {
    this.setState({
      valuesAreShown: !this.state.valuesAreShown
    })
  }

  updateFizz: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const fizzIn: number = Number(event.target.value)
    if (Number.isInteger(fizzIn)) {
      this.setState({
        fizzValue: fizzIn
      })
    } else {
      this.setState({
        fizzValue: 2
      })
    }
  }

  updateBuzz: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const buzzIn: number = Number(event.target.value)
    if (Number.isInteger(buzzIn)) {
      this.setState({
        buzzValue: buzzIn
      })
    } else {
      this.setState({
        buzzValue: 3
      })
    }
  }

  renderValues () {
    return (
      <Values
        toggleValuesAreShown={() => this.toggleValuesAreShown()}
        fizzValue={this.state.fizzValue}
        buzzValue={this.state.buzzValue}
        updateFizz={(event) => this.updateFizz(event)}
        updateBuzz={(event) => this.updateBuzz(event)}
      />
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
