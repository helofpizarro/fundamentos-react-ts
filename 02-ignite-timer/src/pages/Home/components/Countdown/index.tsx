import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { CountdownContainer, Separator } from './styles'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondPassed,
    amountSecondPassed,
  } = useContext(CyclesContext)

  const totalSecond = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsDifference >= totalSecond) {
          markCurrentCycleAsFinished()
          setSecondPassed(totalSecond)
          clearInterval(interval)
        } else {
          setSecondPassed(secondsDifference)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSecond,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondPassed,
  ])

  const currentSecond = activeCycle ? totalSecond - amountSecondPassed : 0
  const minutesAmount = Math.floor(currentSecond / 60)
  const secondsAmount = currentSecond % 60

  const minutos = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutos}:${seconds}`
    }
  }, [minutos, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutos[0]}</span>
      <span>{minutos[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
