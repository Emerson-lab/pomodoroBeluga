import { produce } from "immer";
import { ActionTypes } from "./actions";


export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}



export function cyclesReducer(state: CyclesState, action: any) {

  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      //modo tradicional: respeitando as regras de imutabilidade do react
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleId: action.payload.newCycle.id
      // }
      //----------------------------------------------------------------//
      //metodo com a lib immer-js
      return produce(state, draft => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id
      })
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      //modo tradicional: respeitando as regras de imutabilidade do react
      // return {
      //   ...state,
      //   cycles: state.cycles.map(cycle => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, interruptedDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }),
      //   activeCycleId: null
      // }

      //----------------------------------------------------------------//
      //metodo com a lib immer-js
      const curretnCycleIndex = state.cycles.findIndex(cycle => {
        return cycle.id === state.activeCycleId
      });

      if (curretnCycleIndex < 0) {
        return state
      };

      return produce(state, draft => {
        draft.activeCycleId = null;
        draft.cycles[curretnCycleIndex].interruptedDate = new Date();
      })
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      //modo tradicional: respeitando as regras de imutabilidade do react
      // return {
      //   ...state,
      //   cycles: state.cycles.map(cycle => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, finishedDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }),
      //   activeCycleId: null
      // }

      //----------------------------------------------------------------//
      //metodo com a lib immer-js
      const curretnCycleIndex = state.cycles.findIndex(cycle => {
        return cycle.id === state.activeCycleId
      });

      if (curretnCycleIndex < 0) {
        return state
      };

      return produce(state, draft => {
        draft.activeCycleId = null;
        draft.cycles[curretnCycleIndex].finishedDate = new Date();
      })
    default: return state
  }

}