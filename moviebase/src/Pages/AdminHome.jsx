import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHome = () => {
      const navigate = useNavigate();
      
        const goToAddMovie = () => {
          navigate('/addmovie')
        }
  
  return (
    <div>
        <h1>AdminHome</h1>
        <button onClick={goToAddMovie} >Add Movie</button>
    </div>
  )
}

export default AdminHome