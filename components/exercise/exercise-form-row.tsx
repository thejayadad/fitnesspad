import React from 'react'
import { FiPlus, FiX } from 'react-icons/fi'

interface ExerciseFormRowProps {
  showForm: boolean
  formValues: {
    name: string
    field1: string
    field2: string
  }
  placeholders: [string, string]
  onChange: (field: string, value: string) => void
  onAdd: () => void
  onCancel: () => void
  onShowForm: () => void
  label: string
}

const ExerciseFormRow: React.FC<ExerciseFormRowProps> = ({
  showForm,
  formValues,
  placeholders,
  onChange,
  onAdd,
  onCancel,
  onShowForm,
  label,
}) => {
  if (showForm) {
    return (
      <tr className='border-t border-neutral-200 w-full '>
        <td className=''>
          <input
            type='text'
            placeholder='Name'
            value={formValues.name ?? ''}
            onChange={(e) => onChange('name', e.target.value)}
            className='w-full p-1 border-b  border-neutral-200  rounded'
          />
        </td>
        <td>
          <input
            type='number'
            placeholder={placeholders[0]}
            value={formValues.field1 ?? ''}
            onChange={(e) => onChange('field1', e.target.value)}
            className='w-full p-1 border-b border-l  border-neutral-200  rounded text-center'
          />
        </td>
        <td>
          <input
            type='number'
            placeholder={placeholders[1]}
            value={formValues.field2 ?? ''}
            onChange={(e) => onChange('field2', e.target.value)}
            className='w-full p-1 border-b border-l  border-neutral-200  rounded text-center'
          />
        </td>
        <td className='flex items-center justify-center gap-2 mt-2'>
          <button onClick={onAdd}><FiPlus className='text-green-800' /></button>
          <button onClick={onCancel}><FiX className='text-neutral-500' /></button>
        </td>
      </tr>
    )
  }

  return (
    <tr>
      <td colSpan={4} className='text-center py-2'>
        <button
          onClick={onShowForm}
          className='text-blue-500 hover:underline text-sm flex items-center justify-center gap-1'
        >
          <FiPlus className='h-4 w-4' /> Add {label} Exercise
        </button>
      </td>
    </tr>
  )
}

export default ExerciseFormRow
