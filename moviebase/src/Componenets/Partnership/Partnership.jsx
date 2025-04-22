import React from 'react'
import "../Partnership/Partnership.css"
import NetflixLogo from "../../assets/NetflixLogo.png"
import AmazonPrime from "../../assets/AmazonPrime.png"
import DisneyLogo from "../../assets/DisneyLogo.png"
// import DisneyLogo2 from '../../assets/DisneyLogo2.png'

const Partnership = () => {
  return (
    <div className="MainPartnership">
      <div className="headings">
        <h1>Our Streaming Partners</h1>
        <h3>Bringing you content from the world’s top platforms</h3>
      </div>
      <div className="logos">
        <img src={AmazonPrime} alt="netflix Logo" />
        <img src={NetflixLogo} alt="netflix Logo" />
        <img src={DisneyLogo} alt="netflix Logo" />
        {/* <img src={DisneyLogo2} alt="netflix Logo" /> */}
      </div>
    </div>
  )
}

export default Partnership