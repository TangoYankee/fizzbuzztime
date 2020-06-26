import * as React from 'react'

import { FizzBuzz, TimerClick } from 'components/FizzBuzz'

type TimerProps = {
  toggleValuesAreShown: FizzBuzz['toggleValuesAreShown']
  timerClicks: TimerClick[][]
  updateTimerClicks: FizzBuzz['updateTimerClicks']
  isStopped: boolean
  toggleStopped: FizzBuzz['toggledStopped']
}

export class Timer extends React.Component<TimerProps, { elapsedTime: number, }> {
  interval: NodeJS.Timeout
  constructor (props: TimerProps) {
    super(props)
    this.state = { elapsedTime: 0 }
  }

  getElapsedTime () {
    const currentTimerClicks: TimerClick[][] = this.props.timerClicks.slice()
    const currentTimer: TimerClick[] = currentTimerClicks[currentTimerClicks.length - 1]
    var startTotals: number = 0
    var stopTotals: number = 0
    for (const timerClick of currentTimer) {
      timerClick.type === 'start' && (startTotals += timerClick.datetime.getTime())
      timerClick.type === 'stop' && (stopTotals += timerClick.datetime.getTime())
    }
    this.props.isStopped || (stopTotals += new Date().getTime())
    this.setState({
      elapsedTime: stopTotals - startTotals
    })
  }

  componentDidMount () {
    this.interval = setInterval(() => this.getElapsedTime(), 25)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  clickStart (timerClick: TimerClick) {
    if (this.props.isStopped) {
      this.props.updateTimerClicks(timerClick)
      this.props.toggleStopped()
    }
  }

  clickStop (timerClick: TimerClick) {
    if (!this.props.isStopped) {
      this.props.updateTimerClicks(timerClick)
      this.props.toggleStopped()
    }
  }

  render () {
    return (
      <div>
        <button onClick={this.props.toggleValuesAreShown}>
          &lt; Set Times
        </button>
        <h3>Time Elapsed</h3>
        <div>
          {Math.floor(this.state.elapsedTime / 1000)}
        </div>
        <button onClick={() => this.clickStart({ type: 'start', datetime: new Date() })}>Start</button>
        <button onClick={() => this.clickStop({ type: 'stop', datetime: new Date() })}>Stop</button>
        <div>Fizz</div>
      </div>
    )
  }
}
