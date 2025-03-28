import React from 'react'

interface TableHeaderProps {
  title: string
  headerOne: string
  headerTwo: string
}

const TableHeader: React.FC<TableHeaderProps> = ({ title, headerOne, headerTwo }) => {
  return (
    <thead>
      <tr>
        <th className='p-2 text-lg text-left font-medium font-mono text-neutral-700'>{title}</th>
        <th className='p-2 text-center bg-neutral-100 text-neutral-500'>{headerOne}</th>
        <th className='p-2 text-center border-l border-white bg-neutral-100 text-neutral-500'>{headerTwo}</th>
        <th className='text-center border-l border-white text-neutral-500 border-b'></th>
      </tr>
    </thead>
  )
}

export default TableHeader
