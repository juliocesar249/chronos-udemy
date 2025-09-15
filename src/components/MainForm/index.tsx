import styles from './styles.module.css';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { DefaultInput } from '../DefaultInput';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton/';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions';
import { Tips } from '../Tips';
import { showMessage } from '../../adapters/showMessage';

export function MainForm() {
  const {state, dispatch} = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();

    if(!taskNameInput) return;

    const taskName = taskNameInput.current!.value.trim();

    if(!taskName) {
      showMessage.warning('Nome da tarefa não pode ficar vazio!')
      return;
    }

    const newTask:TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType
    }

    dispatch({type: TaskActionTypes.START_TASK, payload: newTask});
    showMessage.success('Tarefa iniciada');
  }

  function handleInterruptTask() {
    showMessage.dismiss();
    showMessage.error('Tarefa interrompida')
    dispatch({type: TaskActionTypes.INTERRUPT_TASK});
  }

  return (
    <form onSubmit={handleCreateNewTask} className={styles.form} action="">
      <div className={styles.formRow}>
        <DefaultInput 
          placeholder='Digite algo...' 
          labelText='Task' 
          id="meuInput" 
          type='text'
          ref={taskNameInput}
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
        />
      </div>

      <div className={styles.formRow}>
        <Tips/>
      </div>

      {state.currentCycle > 0 && (
      <div className={styles.formRow}>
        <Cycles />
      </div>
      )}
      <div className={styles.formRow}>
        {!state.activeTask && (
          <DefaultButton
          key='botao_button'
          type='submit' 
          color='green' 
          icon={<PlayCircleIcon/>} 
          aria-label='Iniciar nova tarefa' 
          title='Iniciar nova tarefa'
          />
        )}

        {!!state.activeTask && (
          <DefaultButton 
          key='botao_submit'
          type='button' 
          color='red' 
          icon={<StopCircleIcon/>} 
          aria-label='Interromper tarefa atual' 
          title='interromper tarefa atual'
          onClick={handleInterruptTask}
          />
        )}
        
      </div>
    </form>
  )
}