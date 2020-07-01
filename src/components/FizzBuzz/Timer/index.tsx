import * as React from 'react'

import 'components/FizzBuzz/Timer/index.css'
import { ElapsedAtTime } from 'components/FizzBuzz/types'
import { TimerState, TimerProps } from 'components/FizzBuzz/Timer/types'
import { getElapsedAtTime, MaxElapsedMilliSecs, adjustStopTime } from 'components/FizzBuzz/util'
import { updateInterval, formatTime, getFizzBuzzText } from 'components/FizzBuzz/Timer/util'

export class Timer extends React.Component<TimerProps, TimerState> {
  /* Display the elapsed time. Also, control the start, stop, and reset functionality
    Child of FizzBuzz. Sibling of Values. */
  interval: NodeJS.Timeout
  constructor (props: TimerProps) {
    super(props)
    this.state = {
      elapsedMilliSecs: 0
    }
  }

  rollingTimer () {
    /* determine the amount of time that has elapsed, multiple times a second.
    Allow the counter to run as long as it is below the max allowed time.
    If the counter is still running and hits the maximum allowed elapsed time,
    automatically stop it at the time when it would've hit the max time.
    If the counter is stopped and at the maximum allowed time, do nothing.
    Attempting to stop it again will reset it.
    */
    const { elapsedMilliSecs, atTime }: ElapsedAtTime = getElapsedAtTime(this.props.timerClicks, this.props.isStopped)
    if (elapsedMilliSecs < MaxElapsedMilliSecs) {
      this.setState({elapsedMilliSecs})
    } else if (!this.props.isStopped) {
      // const stopTime: Date = (elapsedMilliSecs === MaxElapsedMilliSecs) ? atTime : adjustStopTime(atTime, elapsedMilliSecs)
      const stopTime: Date = adjustStopTime(atTime, elapsedMilliSecs)
      this.props.updateTimerClicks({ type: 'stop', datetime: stopTime })
      this.setState({elapsedMilliSecs: MaxElapsedMilliSecs })
    }
  }

  componentDidMount () {
    /* 1/25 milliseconds is the slowest update rate without noticeable lag in mounting timer. */
    this.interval = setInterval(() => this.rollingTimer(), updateInterval)
  }

  componentWillUnmount () {
    /* Prevent memory leaks */
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
          {formatTime(this.state.elapsedMilliSecs)}
        </div>
        <div className="timer-btn-container">
          <button className="timer-btn start-btn" onClick={() => this.props.updateTimerClicks({ type: 'start', datetime: new Date() })}>Start</button>
          <button className="timer-btn stop-btn" onClick={() => this.props.updateTimerClicks({ type: 'stop', datetime: new Date() })}>Stop/Reset</button>
        </div>
        <div className="fizz-buzz-text">
          {getFizzBuzzText(this.state.elapsedMilliSecs, this.props.fizzValue, this.props.buzzValue)}
        </div>
      </div>
    )
  }
}
