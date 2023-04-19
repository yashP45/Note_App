import React from 'react'
import Navbarr from '../components/Navbar'
import CreateNote from '../components/Input'
import Container from '../components/Pagination'
import Notes from '../components/Notes'

const Dashboard = () => {
  const items = ["First div with text", "Second div with text", "Third div with text"];
  return (
    
    <div>
      <Navbarr/>
      <CreateNote/>
   <Notes/>
    </div>
  )
}

export default Dashboard
