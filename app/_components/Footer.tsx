import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-green-500 border-t  py-4 text-center text-sm text-white">
    &copy; {new Date().getFullYear()} GreenBasket. All rights reserved.
  </footer>
  )
}

export default Footer