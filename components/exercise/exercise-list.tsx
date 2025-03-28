'use client'

import { postExercise } from '@/lib/action/add-exercise'
import { getExercises } from '@/lib/action/get-exercises'
import { deleteExercise } from '@/lib/action/delete-exercise'

import React, { useEffect, useState, useTransition } from 'react'
import {
  FaChevronLeft,
  FaChevronRight,
  FaRegCalendarAlt,
} from 'react-icons/fa'
import TableHeader from './table-layout'
import ExerciseRowItem from './exercise-row-item'
import ExerciseFormRow from './exercise-form-row'

type ExerciseType = 'STRENGTH' | 'CARDIO'

interface ExerciseDetails {
    id: string
    setNumber: number
    reps?: number | null
    weight?: number | null
    duration?: number | null
    calories?: number | null
    createdAt: Date
    updatedAt: Date
    exerciseId: string
  }
  

interface Exercise {
  id: string
  name: string
  type: ExerciseType
  date: string
  details: ExerciseDetails[]
}

const Exerciselist = () => {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [addingCardio, setAddingCardio] = useState(false)
  const [addingStrength, setAddingStrength] = useState(false)

  const [cardioForm, setCardioForm] = useState({
    name: '',
    field1: '', // minutes
    field2: '', // calories
  })
  

  const [strengthForm, setStrengthForm] = useState({
    name: '',
    field1: '', // reps
    field2: '', // weight
  })
  

  const [isPending, startTransition] = useTransition()

  const fetchExercises = async () => {
    const data = await getExercises()
    setExercises(data)
  }

  useEffect(() => {
    startTransition(() => {
      fetchExercises()
    })
  }, [])

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

  const filteredExercises = exercises.filter((ex) => {
    const exerciseDate = new Date(ex.date)
    return exerciseDate.toDateString() === selectedDate.toDateString()
  })

  const cardioExercises = filteredExercises.filter((ex) => ex.type === 'CARDIO')
  const strengthExercises = filteredExercises.filter((ex) => ex.type === 'STRENGTH')

  const totalMinutes = cardioExercises.reduce(
    (sum, ex) => sum + (ex.details[0]?.duration ?? 0),
    0
  )
  const totalCalories = cardioExercises.reduce(
    (sum, ex) => sum + (ex.details[0]?.calories ?? 0),
    0
  )

  const handlePrev = () => {
    const prev = new Date(selectedDate)
    prev.setDate(prev.getDate() - 1)
    setSelectedDate(prev)
  }

  const handleNext = () => {
    const next = new Date(selectedDate)
    next.setDate(next.getDate() + 1)
    setSelectedDate(next)
  }

  const resetCardioForm = () => {
    setCardioForm({ name: '', field1: '', field2: '' })
    setAddingCardio(false)
  }

  const resetStrengthForm = () => {
    setStrengthForm({ name: '', field1: '', field2: '' })
    setAddingStrength(false)
  }

  const handleAddCardio = async () => {
    const res = await postExercise({
      name: cardioForm.name,
      type: 'CARDIO',
      date: selectedDate,
      details: [
        {
          setNumber: 1,
          duration: parseInt(cardioForm.field1),
          calories: parseInt(cardioForm.field2),
        },
      ],
    })

    if (res.success) {
      resetCardioForm()
      await fetchExercises()
    } else {
      alert(res.message)
    }
  }

  const handleAddStrength = async () => {
    const res = await postExercise({
      name: strengthForm.name,
      type: 'STRENGTH',
      date: selectedDate,
      details: [
        {
          setNumber: 1,
          reps: parseInt(strengthForm.field1),
          weight: parseFloat(strengthForm.field2),
        },
      ],
    })

    if (res.success) {
      resetStrengthForm()
      await fetchExercises()
    } else {
      alert(res.message)
    }
  }

  const handleDeleteExercise = async (id: string) => {
    const res = await deleteExercise(id)
    if (res?.success) {
      await fetchExercises()
    } else {
      alert(res?.message || 'Failed to delete exercise.')
    }
  }

   

  return (
    <div className='h-[90vh]'>
      <div className='h-full  grid grid-rows-12'>
        {/* Header */}
        <div className='row-span-1 flex border-b border-neutral-200 items-center justify-between px-4'>
          <button onClick={handlePrev}><FaChevronLeft /></button>
          <div className='flex items-center gap-2'>
            <FaRegCalendarAlt />
            <span>{formatDate(selectedDate)}</span>
          </div>
          <button onClick={handleNext}><FaChevronRight /></button>
        </div>

        {/* Cardio Table */}
        <div className='row-span-10 overflow-y-auto p-4 space-y-8'>

          {/* Cardio */}
          <table className='w-full border-neutral-200'>
                <TableHeader
                    title='Cardio'
                    headerOne='Minutes'
                    headerTwo='Calories Burned'
                />
            <tbody className='w-full'>
              {cardioExercises.map((ex) => (
                <tr key={ex.id} className='border-t border-neutral-200 w-full'>
                      <ExerciseRowItem
                            key={ex.id}
                            id={ex.id}
                            name={ex.name}
                            detail1={ex.details[0]?.duration ?? '-'}
                            detail2={ex.details[0]?.calories ?? '-'}
                            onDelete={handleDeleteExercise}
                        />
                </tr>
              ))}
         <ExerciseFormRow
            showForm={addingCardio}
            formValues={cardioForm}
            placeholders={['Minutes', 'Calories']}
            onChange={(field, value) => setCardioForm({ ...cardioForm, [field]: value })}
            onAdd={handleAddCardio}
            onCancel={resetCardioForm}
            onShowForm={() => setAddingCardio(true)}
            label="Cardio"
            />
            </tbody>
          </table>
          {cardioExercises.length > 0 && (
            <div className='text-sm text-right text-neutral-600'>
              Total: {totalMinutes} min • {totalCalories} kcal
            </div>
          )}

          {/* Strength */}
          <table className='w-full border-neutral-200 mt-10'>
            <TableHeader
                title='Strength'
                headerOne='Reps'
                headerTwo='Weight (lbs)'
            />
            <tbody>
              {strengthExercises.map((ex) => (
                <tr key={ex.id} className='border-t border-neutral-200'>
                        <ExerciseRowItem
                            key={ex.id}
                            id={ex.id}
                            name={ex.name}
                            detail1={ex.details[0]?.reps ?? '-'}
                            detail2={ex.details[0]?.weight ?? '-'}
                            onDelete={handleDeleteExercise}
                        />                  
                </tr>
              ))}
            <ExerciseFormRow
            showForm={addingStrength}
            formValues={strengthForm}
            placeholders={['Reps', 'Weight lbs']}
            onChange={(field, value) => setStrengthForm({ ...strengthForm, [field]: value })}
            onAdd={handleAddStrength}
            onCancel={resetStrengthForm}
            onShowForm={() => setAddingStrength(true)}
            label="Strength"
            />
            </tbody>
          </table>
          {strengthExercises.length > 0 && (
            <div className='text-sm text-right text-neutral-600'>
              Total Sets: {strengthExercises.length} • Weight:{' '}
                {strengthExercises.reduce((total, ex) => {
                    const d = ex.details[0]
                    const reps = d?.reps ?? 0
                    const weight = d?.weight ?? 0
                    return total + reps * weight
                }, 0)}{' '}
                lbs
            </div>
          )}
       
        </div>

        {/* Footer */}
        <div className='row-span-1 border-t border-neutral-200  flex items-center justify-center'>
          <span className='text-sm font-medium'>
            {filteredExercises.length} total exercises
          </span>
        </div>
      </div>
    </div>
  )
}

export default Exerciselist
