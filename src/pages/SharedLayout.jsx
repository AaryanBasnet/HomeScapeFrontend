import React from 'react'
import Navbar from '../website/NavBar'
import Footer from '../website/Footer'

const SharedLayout = ({children}) => {
  return (
    <div>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
      

    </div>
  )
}

export default SharedLayout
