import React from 'react'
import "../SearchPage_Main/SearchPageMain.css"

const SearchPageMain = () => {
  return (
    <div className='main'>
        <div className='input'>
            <input required type="text" name="text" autoComplete="off" className="input" />
            <label className="user-label">First Name</label>
        </div>
    </div>
  )
}

export default SearchPageMain