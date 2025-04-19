import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHome = () => {

      const navigate = useNavigate();
      
        const goToAdminHome = () => {
          navigate('/Adminhome')
        }

  return (
    <div className='mainForm'>
      <h1>Form</h1>
      <h3>this is admin login</h3>
      <label htmlFor="">username :- </label>
      <input type="text" />
      <br />
      <br />
      <label htmlFor="">password :- </label>
      <input type="text" />
      <br />
      <button onClick={goToAdminHome} >asd</button>
    </div>
  )
}

export default AdminHome