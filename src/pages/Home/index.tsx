import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton
} from "./styles";

import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import zod from "zod";
import { createContext, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

type CyclesContextType = {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassad: number;
  markCurrentCycleAsFinished: () => void;
  setSecondesPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, "minimo de 5 min")
    .max(60, 'Ciclo máximo de 60 min')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export default function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassad, setAmountSecondsPassad] = useState(0);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  });

  const { handleSubmit, watch, reset } = newCycleForm

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSecondesPassed(seconds: number) {
    setAmountSecondsPassad(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles(state => state.map(cycle => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, interruptedDate: new Date() }
      } else {
        return cycle
      }
    }));
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id: id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }
    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassad(0);

    reset();
  }

  function handleInterruptCycle() {
    setCycles(state => state.map(cycle => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, interruptedDate: new Date() }
      } else {
        return cycle
      }
    }));
    setActiveCycleId(null);
  }

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassad,
            setSecondesPassed
          }}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ?
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
          :
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        }

      </form>
    </HomeContainer>
  )
}