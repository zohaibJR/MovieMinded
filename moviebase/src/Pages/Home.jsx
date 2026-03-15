// moviebase/src/Pages/Home.jsx

import React from 'react';
import '../Pages/Styles/HomePage.css';
import Hero from '../Componenets/Hero/hero';
import SearchCard from '../Componenets/HomePage-SearchCard/SearchCard';
import Partnership from '../Componenets/Partnership/Partnership';
import UserReviews from '../Componenets/UserReviews/UserReviews';

const Home = () => {
  return (
    <main className="home-page">
      <Hero />
      <SearchCard />
      <Partnership />
      <UserReviews />
    </main>
  );
};

export default Home;