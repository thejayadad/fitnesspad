import React from 'react'
import Logo from '../ui/Logo'

const Header = () => {
  return (
    <header className='w-full py-3'>
        <div className='mx-auto max-w-screen-lg px-4 w-full flex items-center border-b border-neutral-200 py-2'>
            <Logo />
        </div>
    </header>
  )
}

export default Header