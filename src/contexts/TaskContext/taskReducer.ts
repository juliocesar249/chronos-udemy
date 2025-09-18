import type { TaskStateModel } from "../../models/TaskStateModel";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";
import { getNextCycle } from "../../utils/getNextCycle";
import { initialTaskState } from "./InitialTaskState";
import { TaskActionTypes, type TaskActionModel } from "./TaskActions";

export function taskReducer(state: TaskStateModel, action: TaskActionModel): TaskStateModel {
  switch(action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask =  action.payload;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = newTask.duration * 60;

      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...state.tasks, newTask]
      };
    }
    case TaskActionTypes.INTERRUPT_TASK: {
    
      return {...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => task.id === state.activeTask?.id ? {...task, interruptDate: Date.now()} : task)
      };
    }

    case TaskActionTypes.RESET_STATE:
      return state;

    case TaskActionTypes.COUNT_DOWN: {
      return {...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(action.payload.secondsRemaining)
      }
    }

    case TaskActionTypes.COMPLETE_TASK: {
    
      return {...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => 
          task.id === state.activeTask?.id ? {...task, completeDate: Date.now()} : task
        )
      };
    }

    case TaskActionTypes.DELETE_TASKS: {
      return initialTaskState;
    }
  }
}