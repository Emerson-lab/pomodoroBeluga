import { createContext, useState, useReducer, useEffect } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

type CyclesContextType = {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassad: number;
  interruptCurrentCycle: () => void;
  markCurrentCycleAsFinished: () => void;
  setSecondesPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

type CyclesContextProviderProps = {
  children: React.ReactNode;
}

export function CyclesContextProvaider({ children }: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    { cycles: [], activeCycleId: null },
    (initialState) => { 
      const storedStateAsJSON = localStorage.getItem('@pomodoro-beluga:cycles-state-1.0.0');

      if(storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }

      return {initialState}
    }
  );
  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  const [amountSecondsPassad, setAmountSecondsPassad] = useState(() => {
    if(activeCycle){
      return differenceInSeconds(new Date(),new Date(activeCycle.startDate));
    }
    return 0
  });
  
  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);
    localStorage.setItem('@pomodoro-beluga:cycles-state-1.0.0', stateJSON);
  }, [cyclesState]); 

  function setSecondesPassed(seconds: number) {
    setAmountSecondsPassad(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id: id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }
    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassad(0);
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction());
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassad,
        setSecondesPassed,
        createNewCycle,
        interruptCurrentCycle
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}