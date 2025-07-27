import React from 'react'
import { useNavigate } from 'react-router'

function Navbar() {
  const navigate = useNavigate()
  return (
    <header className='w-full p-3 border-b '>
        <span className='text-2xl font-serif ' onClick={()=> navigate('/chat')}>Pline Chat</span>
    </header>
  )
}

export default Navbar
