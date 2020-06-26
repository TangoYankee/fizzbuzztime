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
    const timerClicks: TimerClick[][] = this.state.timerClicks.slice()
    const currentClicks: TimerClick[] = timerClicks[timerClicks.length - 1]
    const clickType: string = timerClick.type
    const isStopped: boolean = this.state.isStopped
    if (clickType === 'stop' && isStopped) {
      currentClicks.length > 0 && timerClicks.push([])
      this.setState({ timerClicks: timerClicks })
    } else if ((clickType === 'start' && isStopped) || (clickType === 'stop' && !isStopped)) {
      timerClicks[timerClicks.length - 1].push(timerClick)
      this.setState({
        timerClicks: timerClicks,
        isStopped: !this.state.isStopped
      })
    }
  }

  toggleValuesAreShown () { this.setState({ valuesAreShown: !this.state.valuesAreShown }) }

  updateFizz: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const fizzIn: number = Number(event.target.value)
    Number.isInteger(fizzIn) && this.setState({ fizzValue: fizzIn })
  }

  updateBuzz: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const buzzIn: number = Number(event.target.value)
    Number.isInteger(buzzIn) && this.setState({ buzzValue: buzzIn })
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
        updateTimerClicks={(timerClick: TimerClick) => this.updateTimerClicks(timerClick)}
        isStopped={this.state.isStopped}
        fizzValue={this.state.fizzValue}
        buzzValue={this.state.buzzValue}
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
