import { FormCotainer, TaskInput, MinutosAmountInput } from './styles'

import { useContext } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()
  return (
    <FormCotainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestion"
        placeholder="Dê um nome para o seu projeto"
        {...register('task')}
        disabled={!!activeCycle}
      />

      <datalist id="task-suggestion">
        <option value="Projeto 1" />
      </datalist>
      <label>durante</label>
      <MinutosAmountInput
        id="minutesAmount"
        type="number"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos</span>
    </FormCotainer>
  )
}
