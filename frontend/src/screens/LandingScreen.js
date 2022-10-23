import React from 'react'
import { Link } from 'react-router-dom'

function LandingScreen() {
  return (
    <div>
      <h1>Landing Page</h1>
      <Link to='/home'>Start Shopping</Link>
    </div>
  )
}

export default LandingScreen
