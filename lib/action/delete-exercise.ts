// lib/action/delete-exercise.ts
'use server'

import { prisma } from '@/lib/prisma'

export async function deleteExercise(id: string) {
  try {
    const deleted = await prisma.exercise.delete({
      where: { id },
    })

    return { success: true, deleted }
  } catch (error) {
    console.error('Error deleting exercise:', error)
    return { success: false, message: 'Failed to delete exercise' }
  }
}
