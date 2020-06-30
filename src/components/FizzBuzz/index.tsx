import * as React from 'react'

import 'components/FizzBuzz/index.css'
import { Timer } from 'components/FizzBuzz/Timer'
import { Values } from 'components/FizzBuzz/Values'
import { TimerClick, FizzBuzzErrorTypes, FizzBuzzState } from 'components/FizzBuzz/types'
import { MaxElapsedMilliSecs, getElapsedAtTime, areValuesValid } from 'components/FizzBuzz/util'

export class FizzBuzz extends React.Component<{}, FizzBuzzState> {
  constructor (props: {}) {
    super(props)
    this.state = {
      valuesAreShown: true,
      fizzValue: 2,
      buzzValue: 10,
      timerClicks: [[]],
      isStopped: true,
      fizzBuzzError: { type: FizzBuzzErrorTypes.none, message: '' }
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
    } else if (
      (clickType === 'start' && isStopped && getElapsedAtTime(timerClicks, isStopped).elapsedMilliSecs < MaxElapsedMilliSecs) ||
      (clickType === 'stop' && !isStopped)
    ) {
      timerClicks[timerClicks.length - 1].push(timerClick)
      this.setState({
        timerClicks: timerClicks,
        isStopped: !this.state.isStopped
      })
    }
  }

  toggleValuesAreShown () {
    this.setState({
      valuesAreShown: !this.state.valuesAreShown,
      fizzBuzzError: { type: FizzBuzzErrorTypes.none, message: '' }
    })
  }

  updateValue: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (this.state.timerClicks[this.state.timerClicks.length - 1].length === 0) {
      const name: string = event.target.name
      const value: number = Number(event.target.value)
      if ((name === 'fizzValue' || name === 'buzzValue') && (Number.isInteger(value))) {
        this.setState(prevState => ({
          ...prevState,
          [name]: value
        }), () => {
          const valuesValid: boolean = areValuesValid(this.state.fizzValue, this.state.buzzValue)
          const fizzBuzzError = valuesValid
            ? { type: FizzBuzzErrorTypes.none, message: '' }
            : { type: FizzBuzzErrorTypes.invalidRange, message: 'Fizz or Buzz value is not in range of 2 to 10, inclusive.' }
          this.setState({ fizzBuzzError: fizzBuzzError })
        })
      }
    } else {
      this.setState({
        fizzBuzzError: {
          type: FizzBuzzErrorTypes.timerStarted,
          message: 'Fizz and Buzz values cannot be updated once the timer has started. Go to Timer and reset it before continuing.'
        }
      })
    }
  }

  renderValues () {
    return (
      <Values
        toggleValuesAreShown={() => this.toggleValuesAreShown()}
        fizzValue={this.state.fizzValue}
        buzzValue={this.state.buzzValue}
        updateValue={(event) => this.updateValue(event)}
        fizzBuzzError={this.state.fizzBuzzError}
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
      <div className='fizz-buzz-container'>
        {this.state.valuesAreShown ? this.renderValues() : this.renderTimer()}
      </div>
    )
  }
}
