import * as React from 'react'

import { FizzBuzz, TimerClick } from 'components/FizzBuzz'
import { ElapsedAtTime, getElapsedAtTime, MaxElapsedSeconds, adjustStopTime } from 'components/FizzBuzz/util'

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
      const stopTime:Date = (elapsedSeconds === MaxElapsedSeconds) ? atTime : adjustStopTime(atTime, elapsedSeconds)
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
      <div>
        <button onClick={this.props.toggleValuesAreShown}>
          &lt; Set Times
        </button>
        <h3>Time Elapsed</h3>
        <div>
          {this.state.elapsedSeconds}
        </div>
        {/* <button onClick={() => this.props.updateTimerClicks({ type: 'start', datetime: new Date(new Date()-35994000) })}>Start</button> */}
        <button onClick={() => this.props.updateTimerClicks({ type: 'start', datetime: new Date() })}>Start</button>
        <button onClick={() => this.props.updateTimerClicks({ type: 'stop', datetime: new Date() })}>Stop/Reset</button>
        <div>
          {this.state.fizzBuzz}
        </div>
      </div>
    )
  }
}
