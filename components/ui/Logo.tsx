'use client'

import React from 'react'
import { FaDumbbell } from 'react-icons/fa'

const Logo = () => {
  return (
    <div className="flex items-center space-x-2 font-bold text-2xl">
      <FaDumbbell className="text-orange-500 animate-pulse" />
      <span className="bg-gradient-to-r from-orange-500 via-yellow-400 to-lime-500 bg-clip-text text-transparent">
        Fitness<span className="text-neutral-800 dark:text-white">Pad</span>
      </span>
    </div>
  )
}

export default Logo
