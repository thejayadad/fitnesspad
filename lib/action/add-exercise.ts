'use server'

import { prisma } from '../prisma'

interface CardioDetails {
  setNumber: number
  duration: number
  calories: number
}

interface StrengthDetails {
  setNumber: number
  reps: number
  weight: number
}

interface CreateExerciseInput {
  name: string
  type: 'STRENGTH' | 'CARDIO'
  date: Date | string
  note?: string
  details?: CardioDetails[] | StrengthDetails[]
}

export async function postExercise(data: CreateExerciseInput) {
  try {
    const { name, type, date, note = '', details = [] } = data

    const exercise = await prisma.exercise.create({
      data: {
        name,
        type,
        date: new Date(date),
        note,
        details: {
          create: details.map((detail, index) => ({
            setNumber: detail.setNumber ?? index + 1,
            reps: type === 'STRENGTH' ? (detail as StrengthDetails).reps : undefined,
            weight: type === 'STRENGTH' ? (detail as StrengthDetails).weight : undefined,
            duration: type === 'CARDIO' ? (detail as CardioDetails).duration : undefined,
            calories: type === 'CARDIO' ? (detail as CardioDetails).calories : undefined,
          })),
        },
      },
      include: {
        details: true,
      },
    })

    return { success: true, exercise }
  } catch (error) {
    console.error('Error creating exercise:', error)
    return { success: false, message: 'Failed to create exercise.' }
  }
}
