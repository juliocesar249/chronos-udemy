import { useTaskContext } from "../../contexts/TaskContext/useTaskContext"
import { getNextCycleType } from "../../utils/getNextCycleType";
import { getNextCycle } from "../../utils/getNextCycle";

export function Tips() {
  const {state}= useTaskContext()
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);
  const tipsForWhenActiveTask = {
    workTime: <span>Foque por <b>{state.config.workTime}min</b></span>,
    shortBreakTime: <span>Descanse por <b>{state.config.shortBreakTime}min</b></span>,
    longBreakTime: <span>Descanso <b>longo</b></span>
  }
  const tipsForNoActiveTask = {
    workTime: <span>Próximo ciclo é de <b>{state.config.workTime}min</b></span>,
    shortBreakTime: <span>Próximo descanso é de <b>{state.config.shortBreakTime}min</b></span>,
    longBreakTime: <span>Próximo descanso será <b>longo</b></span>
  }
  return <>
        {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
        {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
  </>
}