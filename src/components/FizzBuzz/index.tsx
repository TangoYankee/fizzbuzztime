import * as React from 'react'

import 'components/FizzBuzz/index.css'
import { Timer } from 'components/FizzBuzz/Timer'
import { Values } from 'components/FizzBuzz/Values'
import { TimerClick, FizzBuzzErrorTypes, FizzBuzzState } from 'components/FizzBuzz/types'
import { MaxElapsedMilliSecs, getElapsedAtTime, areValuesValid } from 'components/FizzBuzz/util'

export class FizzBuzz extends React.Component<{}, FizzBuzzState> {
  /* Parent Component. Children are:
  - Timer, shows elapsed seconds
  - Values, shows inputs for fizz and buzz */
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
    /* Receive the date of either a stop or a start click.
    When the user clicks stops and the timer is already stopped, reset the timer by making a new blank list.
    When the user clicks stop and the timer is running, stop the timer and record the time to the current list.
    When the user clicks start, only start the timer if it wasn't already running.
    Also, the elapsed time must be below the allowed maximum to start the timer. */
    const timerClicks: TimerClick[][] = this.state.timerClicks.slice()
    const currentClicks: TimerClick[] = timerClicks[timerClicks.length - 1]
    const clickType: string = timerClick.type
    const isStopped: boolean = this.state.isStopped
    if (clickType === 'stop' && isStopped) {
      currentClicks.length > 0 && timerClicks.push([])
      this.setState({ timerClicks })
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
    /* Switch shown compononent between Timer and Values.
    Default to Values */
    this.setState({
      valuesAreShown: !this.state.valuesAreShown,
      fizzBuzzError: { type: FizzBuzzErrorTypes.none, message: '' }
    })
  }

  updateValue: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    /* Fizz and Buzz values can only be updated when no time has elapsed.
    This is indicated by the lastest list of start/stop values being empty.
    When the state of the values is updated with integers,
    callback to check whether these new integers are in the valid range.
    Inform the user if something is wrong. */
    const currentTimerClicks:number = this.state.timerClicks[this.state.timerClicks.length - 1].length
    if (currentTimerClicks === 0) {
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
    /* Send state of FizzBuzz parent to prop of Values child */
    return (
      <Values
        toggleValuesAreShown={() => this.toggleValuesAreShown()}
        fizzValue={this.state.fizzValue}
        buzzValue={this.state.buzzValue}
        updateValue={this.updateValue}
        fizzBuzzError={this.state.fizzBuzzError}
      />
    )
  }

  renderTimer () {
    /* Send state of FizzBuzz parent to prop of Timer child */
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
    /* Render either child, defaulting to inputs for fizz buzz values */
    return (
      <div className='fizz-buzz-container'>
        {this.state.valuesAreShown ? this.renderValues() : this.renderTimer()}
      </div>
    )
  }
}
