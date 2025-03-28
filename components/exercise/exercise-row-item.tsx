'use client'

import React from 'react'
import { FiTrash } from 'react-icons/fi'

interface ExerciseRowItemProps {
  id: string
  name: string
  detail1?: string | number
  detail2?: string | number
  onDelete: (id: string) => void
}

const ExerciseRowItem: React.FC<ExerciseRowItemProps> = ({
  id,
  name,
  detail1,
  detail2,
  onDelete,
}) => {
  return (
<>
<td className="px-3 py-2 text-neutral-800 font-mono">{name}</td>
      <td className="text-center px-3 py-2 text-neutral-700">{detail1 ?? '-'}</td>
      <td className="text-center px-3 py-2 text-neutral-700">{detail2 ?? '-'}</td>
      <td className="text-center px-3 py-2">
        <button onClick={() => onDelete(id)}>
          <FiTrash className="h-4 w-4 text-red-500 cursor-pointer" />
        </button>
      </td>
</>
   
  )
}

export default ExerciseRowItem
