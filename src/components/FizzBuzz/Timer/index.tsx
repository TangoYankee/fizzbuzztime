import * as React from 'react'

import { FizzBuzz, TimerClick } from 'components/FizzBuzz'

type TimerProps = {
  toggleValuesAreShown: FizzBuzz['toggleValuesAreShown']
  timerClicks: TimerClick[][]
  updateTimerClicks: FizzBuzz['updateTimerClicks']
  isStopped: boolean
  fizzValue: number
  buzzValue: number
}

export class Timer extends React.Component<TimerProps, { elapsedSeconds: number, fizzBuzz: string }> {
  interval: NodeJS.Timeout
  constructor (props: TimerProps) {
    super(props)
    this.state = {
      elapsedSeconds: 0,
      fizzBuzz: ''
    }
  }

  getElapsedSeconds (): number {
    const currentTimerClicks: TimerClick[][] = this.props.timerClicks.slice()
    const currentTimer: TimerClick[] = currentTimerClicks[currentTimerClicks.length - 1]
    var startTotals: number = 0
    var stopTotals: number = 0
    for (const timerClick of currentTimer) {
      timerClick.type === 'start' && (startTotals += timerClick.datetime.getTime())
      timerClick.type === 'stop' && (stopTotals += timerClick.datetime.getTime())
    }
    this.props.isStopped || (stopTotals += new Date().getTime())
    return Math.floor((stopTotals - startTotals) / 1000)
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
    const elapsedSeconds: number = this.getElapsedSeconds()
    const fizzBuzz: string = this.getFizzBuzz(elapsedSeconds)
    this.setState({
      elapsedSeconds: elapsedSeconds,
      fizzBuzz: fizzBuzz
    })
  }

  componentDidMount () {
    this.interval = setInterval(() => this.rollingTimer(), 25)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    return (
      <div>
        <button onClick={this.props.toggleValuesAreShown}>
          &lt; Set Times
        </button>
        <h3>Time Elapsed</h3>
        <div>
          {this.state.elapsedSeconds}
        </div>
        <button onClick={() => this.props.updateTimerClicks({ type: 'start', datetime: new Date() })}>Start</button>
        <button onClick={() => this.props.updateTimerClicks({ type: 'stop', datetime: new Date() })}>Stop/Reset</button>
        <div>
          {this.state.fizzBuzz}
        </div>
      </div>
    )
  }
}
