import React from 'react'
import "../Pages/Styles/HomePage.css"
import Hero from '../Componenets/Hero/hero'
import SearchCard from '../Componenets/HomePage-SearchCard/SearchCard'
import Partnership from '../Componenets/Partnership/Partnership'

const Home = () => {
  return (
    <>
      <Hero />
      <SearchCard />
      <Partnership />
    </>
  )
}

export default Home