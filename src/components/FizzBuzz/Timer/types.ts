import { FizzBuzz } from 'components/FizzBuzz'
import { TimerClick } from 'components/FizzBuzz/types'

export type TimerState = {
    elapsedSeconds: number
  }

export type TimerProps = {
    toggleValuesAreShown: FizzBuzz['toggleValuesAreShown']
    timerClicks: TimerClick[][]
    updateTimerClicks: FizzBuzz['updateTimerClicks']
    isStopped: boolean
    fizzValue: number
    buzzValue: number
  }
