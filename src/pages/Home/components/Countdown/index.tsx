import { useContext, useEffect, useState } from 'react';
import { CountdownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns';
import { CyclesContext } from '../..';

export function Countdown() {
  const {activeCycle, activeCycleId, markCurrentCycleAsFinished} = useContext(CyclesContext);
  const [amountSecondsPassad, setAmountSecondsPassad] = useState(0);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondesDifference = differenceInSeconds(new Date(), activeCycle.startDate);

        if (secondesDifference >= totalSeconds) {
          markCurrentCycleAsFinished();

          setAmountSecondsPassad(totalSeconds);
          clearInterval(interval);
        } else {
          setAmountSecondsPassad(secondesDifference);
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval);
    }

  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished]);

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassad : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}: ${seconds}`
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}