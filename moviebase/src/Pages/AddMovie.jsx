import React, { useState } from 'react';
import './Styles/AddMovie.css';
import axios from 'axios';

const AddMovie = () => {
  const [formData, setFormData] = useState({
    moviename: '',
    summary: '',
    youtubeLink: '',
    releaseYear: '',
    genre: '',
    duration: '',
    language: '',
    country: '',
    ageRating: '',
    pgRating: '',
    picture: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/movies', data);
      alert('Movie added successfully!');
      console.log(res.data);
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="form-container">
      <h1>Add Movie Form</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Movie Name:
          <input type="text" name="moviename" value={formData.moviename} onChange={handleChange} required />
        </label>

        <label>Summary:
          <textarea name="summary" value={formData.summary} onChange={handleChange} required />
        </label>

        <label>Youtube Link:
          <input type="text" name="youtubeLink" value={formData.youtubeLink} onChange={handleChange} required />
        </label>

        <label>Release Year:
          <input type="number" name="releaseYear" value={formData.releaseYear} onChange={handleChange} required />
        </label>

        <label>Genre:
          <input type="text" name="genre" value={formData.genre} onChange={handleChange} required />
        </label>

        <label>Duration (min):
          <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />
        </label>

        <label>Language:
          <input type="text" name="language" value={formData.language} onChange={handleChange} required />
        </label>

        <label>Country:
          <input type="text" name="country" value={formData.country} onChange={handleChange} required />
        </label>

        <label>Age Rating:
          <input type="number" step="0.1" name="ageRating" value={formData.ageRating} onChange={handleChange} required />
        </label>

        <label>PG Rating:
          <input type="text" name="pgRating" value={formData.pgRating} onChange={handleChange} required />
        </label>

        <label>Picture:
          <input type="file" name="picture" onChange={handleChange} accept="image/*" required />
        </label>

        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
