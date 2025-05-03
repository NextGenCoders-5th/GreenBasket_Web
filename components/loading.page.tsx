import React from 'react'

const LoadingPage = () => {
  return (
    <div className="flex relative items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent-400">
      <p className=" absolute text-lg text-accent-400">Loading...</p>
      </div>
    </div>
  )
}

export default LoadingPage