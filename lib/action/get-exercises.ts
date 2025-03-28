'use server'

import { prisma } from '@/lib/prisma'

export const getExercises = async () => {
  const exercises = await prisma.exercise.findMany({
    include: {
      details: true,
    },
    orderBy: {
      date: 'desc',
    },
  })

  // Convert `date: Date` to `date: string`
  return exercises.map((ex) => ({
    ...ex,
    date: ex.date.toISOString(),
  }))
}
