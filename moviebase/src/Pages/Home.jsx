import React from 'react'
import "../Pages/Styles/HomePage.css"
import Hero from '../Componenets/Hero/hero'
import SearchCard from '../Componenets/HomePage-SearchCard/SearchCard'

const Home = () => {
  return (
    <>
      <Hero />
      <SearchCard />
    </>
  )
}

export default Home