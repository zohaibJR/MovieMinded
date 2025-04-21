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
  <form onSubmit={handleSubmit} encType="multipart/form-data">

    <div className="leftSide">
        <label>Upload Picture:
            <input type="file" name="picture" accept="image/*" onChange={handleChange} />
        </label>
    </div>

    <div className="midSide">
      <h1>Mid Side</h1>
        <label>Movie Name:
            <input type="text" name="moviename" value={formData.moviename} onChange={handleChange} />
          </label>
          <br />

          <label>Summary:
            <textarea name="summary" value={formData.summary} onChange={handleChange} />
          </label>

          <label>Release Year:
            <input type="number" name="releaseYear" value={formData.releaseYear} onChange={handleChange} />
          </label>

          <label>Genre:
            <input type="text" name="genre" value={formData.genre} onChange={handleChange} />
          </label>

          <label>Duration (mins):
            <input type="number" name="duration" value={formData.duration} onChange={handleChange} />
          </label>
    </div>

    <div className="rightSide">
      <h1>Right Side</h1>
      <label>Language:
            <input type="text" name="language" value={formData.language} onChange={handleChange} />
          </label>

          <label>Country:
            <input type="text" name="country" value={formData.country} onChange={handleChange} />
          </label>

          <label>Age Rating:
            <input type="text" name="ageRating" value={formData.ageRating} onChange={handleChange} />
          </label>

          <label>PG Rating:
            <input type="text" name="pgRating" value={formData.pgRating} onChange={handleChange} />
          </label>

          <label>YouTube Link:
            <input type="text" name="youtubeLink" value={formData.youtubeLink} onChange={handleChange} />
          </label>

          <button type="submit">Add Movie</button>
    </div>

  </form>
</div>
  );
};

export default AddMovie;
