import React from 'react'

interface Props{
    children?: React.ReactNode
}
const NotFound = ({children}:Props) => {
  return (
    <div className='w-full h-50vh flex flex-col items-center justify-center p-4'>
        {children || "Not Found"}
    </div>
  )
}

export default NotFound