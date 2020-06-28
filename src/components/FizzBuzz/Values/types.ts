import { FizzBuzz } from 'components/FizzBuzz'
import { FizzBuzzError } from 'components/FizzBuzz/types'

export type ValuesProps = {
    toggleValuesAreShown: FizzBuzz['toggleValuesAreShown'],
    fizzValue: number,
    buzzValue: number,
    updateValue: FizzBuzz['updateValue'],
    fizzBuzzError: FizzBuzzError
}
