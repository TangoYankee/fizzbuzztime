import * as React from 'react'

import 'components/FizzBuzz/Timer/index.css'
import { TimerState, TimerProps } from 'components/FizzBuzz/Timer/types'
import { ElapsedAtTime, getElapsedAtTime, MaxElapsedSeconds, adjustStopTime } from 'components/FizzBuzz/util'
import { formatTime } from 'components/FizzBuzz/Timer/util'

export class Timer extends React.Component<TimerProps, TimerState> {
  interval: NodeJS.Timeout
  constructor (props: TimerProps) {
    super(props)
    this.state = {
      elapsedSeconds: 0,
      fizzBuzz: ''
    }
  }

  getFizzBuzz (elapsedSeconds: number): string {
    const isFizz = (elapsedSeconds > 0 && elapsedSeconds % this.props.fizzValue === 0)
    const isBuzz = (elapsedSeconds > 0 && elapsedSeconds % this.props.buzzValue === 0)
    if (isFizz && isBuzz) return 'FizzBuzz'
    else if (isFizz) return 'Fizz'
    else if (isBuzz) return 'Buzz'
    return ''
  }

  rollingTimer () {
    const { elapsedSeconds, atTime }: ElapsedAtTime = getElapsedAtTime(this.props.timerClicks, this.props.isStopped)
    if (elapsedSeconds < MaxElapsedSeconds) {
      const fizzBuzz: string = this.getFizzBuzz(elapsedSeconds)
      this.setState({
        elapsedSeconds: elapsedSeconds,
        fizzBuzz: fizzBuzz
      })
    } else if (!this.props.isStopped) {
      const fizzBuzz: string = this.getFizzBuzz(MaxElapsedSeconds)
      const stopTime: Date = (elapsedSeconds === MaxElapsedSeconds) ? atTime : adjustStopTime(atTime, elapsedSeconds)
      this.props.updateTimerClicks({ type: 'stop', datetime: stopTime })
      this.setState({
        elapsedSeconds: MaxElapsedSeconds,
        fizzBuzz: fizzBuzz
      })
    }
  }

  componentDidMount () {
    this.interval = setInterval(() => this.rollingTimer(), 25)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    return (
      <div className="fizz-buzz-child-container timer-container">
        <button className="nav-btn" onClick={this.props.toggleValuesAreShown}>
          &lt; Set Times
        </button>
        <div className="timer-title">Time Elapsed</div>
        <div className="counter-display">
          {formatTime(this.state.elapsedSeconds)}
        </div>
        {/* <button onClick={() => this.props.updateTimerClicks({ type: 'start', datetime: new Date(new Date()-35994000) })}>Start</button> */}
        {/* <button onClick={() => this.props.updateTimerClicks({ type: 'start', datetime: new Date(new Date()-6594000) })}>Start</button> */}
        <div className="timer-btn-container">
          <button className="timer-btn start-btn" onClick={() => this.props.updateTimerClicks({ type: 'start', datetime: new Date() })}>Start</button>
          <button className="timer-btn stop-btn" onClick={() => this.props.updateTimerClicks({ type: 'stop', datetime: new Date() })}>Stop/Reset</button>
        </div>
        <div className="fizz-buzz-text">
          {this.state.fizzBuzz}
        </div>
      </div>
    )
  }
}
