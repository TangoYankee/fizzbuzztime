import * as React from 'react'

import 'components/FizzBuzz/Timer/index.css'
import { ElapsedAtTime } from 'components/FizzBuzz/types'
import { TimerState, TimerProps } from 'components/FizzBuzz/Timer/types'
import { getElapsedAtTime, MaxElapsedSeconds, adjustStopTime } from 'components/FizzBuzz/util'
import { formatTime, getFizzBuzzText } from 'components/FizzBuzz/Timer/util'

export class Timer extends React.Component<TimerProps, TimerState> {
  interval: NodeJS.Timeout
  constructor (props: TimerProps) {
    super(props)
    this.state = {
      elapsedSeconds: 0
    }
  }

  rollingTimer () {
    const { elapsedSeconds, atTime }: ElapsedAtTime = getElapsedAtTime(this.props.timerClicks, this.props.isStopped)
    if (elapsedSeconds < MaxElapsedSeconds) {
      this.setState({
        elapsedSeconds: elapsedSeconds
      })
    } else if (!this.props.isStopped) {
      const stopTime: Date = (elapsedSeconds === MaxElapsedSeconds) ? atTime : adjustStopTime(atTime, elapsedSeconds)
      this.props.updateTimerClicks({ type: 'stop', datetime: stopTime })
      this.setState({
        elapsedSeconds: MaxElapsedSeconds
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
        <div className="timer-btn-container">
          <button className="timer-btn start-btn" onClick={() => this.props.updateTimerClicks({ type: 'start', datetime: new Date() })}>Start</button>
          <button className="timer-btn stop-btn" onClick={() => this.props.updateTimerClicks({ type: 'stop', datetime: new Date() })}>Stop/Reset</button>
        </div>
        <div className="fizz-buzz-text">
          {getFizzBuzzText(this.state.elapsedSeconds, this.props.fizzValue, this.props.buzzValue)}
        </div>
      </div>
    )
  }
}
