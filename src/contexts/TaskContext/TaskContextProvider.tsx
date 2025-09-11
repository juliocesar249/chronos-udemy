import {useEffect, useReducer } from "react";
import { initialTaskState } from "./InitialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./TaskActions";

type TaskContextProviderProps = {
  children: React.ReactNode
}

export function TaskContextProvider({children}: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer,initialTaskState);

  const worker = TimerWorkerManager.getInstance();
  worker.onMessage(e =>{
    const countDownSeconds = e.data;

    if(countDownSeconds <= 0) {
      dispatch({
        type: TaskActionTypes.COMPLETE_TASK
      });
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: {secondsRemaining: countDownSeconds}
      })
    }
  });

  useEffect(() => {
    if(!state.activeTask) {
      console.log('Worker terminado por falta de active task.');
      worker.terminate();
    }

    worker.postMessage(state)
  }, [worker, state])
  
  return <TaskContext.Provider value={{state, dispatch}}>
    {children}
  </TaskContext.Provider>
}