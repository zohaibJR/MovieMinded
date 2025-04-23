import React from 'react'
import "../Pages/Styles/HomePage.css"
import Hero from '../Componenets/Hero/hero'
import SearchCard from '../Componenets/HomePage-SearchCard/SearchCard'
import Partnership from '../Componenets/Partnership/Partnership'
import UserReviews from '../Componenets/UserReviews/UserReviews'

const Home = () => {
  return (
    <>
      <Hero />
      <SearchCard />
      <Partnership />
      <UserReviews />
    </>
  )
}

export default Home