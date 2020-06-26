import * as React from 'react'

import { Timer } from 'components/FizzBuzz/Timer'
import { Values } from 'components/FizzBuzz/Values'

export interface TimerClick {
    type: string,
    datetime: Date
}

type FizzBuzzState = {
  valuesAreShown: boolean
  fizzValue: number
  buzzValue: number
  timerClicks: TimerClick[][]
  isStopped: boolean
}

export class FizzBuzz extends React.Component<{}, FizzBuzzState> {
  constructor (props: any) {
    super(props)
    this.state = {
      valuesAreShown: true,
      fizzValue: 2,
      buzzValue: 10,
      timerClicks: [[]],
      isStopped: true
    }
  }

  updateTimerClicks (timerClick: TimerClick) {
    const timerClicks = this.state.timerClicks.slice()
    timerClicks[timerClicks.length - 1].push(timerClick)
    this.setState({
      timerClicks: timerClicks
    })
  }

  toggleValuesAreShown () {
    this.setState({
      valuesAreShown: !this.state.valuesAreShown
    })
  }

  toggledStopped () {
    this.setState({
      isStopped: !this.state.isStopped
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
      <Timer
        toggleValuesAreShown={() => this.toggleValuesAreShown()}
        timerClicks={this.state.timerClicks}
        updateTimerClicks={(timerClick:TimerClick) => this.updateTimerClicks(timerClick)}
        isStopped={this.state.isStopped}
        toggleStopped={() => this.toggledStopped()}
      />
    )
  }

  render () {
    return (
      <div>
        {this.state.valuesAreShown ? this.renderValues() : this.renderTimer()}
      </div>
    )
  }
}
