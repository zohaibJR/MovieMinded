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
      await axios.post('http://localhost:5000/api/movies', data);
      alert('🎬 Movie added successfully!');
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="add-movie-page">
      <div className="form-wrapper">
        <h1 className="form-title">Add New Movie</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="movie-form">
          
          {/* Section 1: Media */}
          <div className="form-section media-upload">
            <div className="upload-box">
              <label className="file-label">
                <span className="upload-icon">📁</span>
                {formData.picture ? formData.picture.name : "Upload Movie Poster"}
                <input type="file" name="picture" accept="image/*" onChange={handleChange} required />
              </label>
              {formData.picture && <p className="file-ready">Image selected!</p>}
            </div>
          </div>

          {/* Section 2: Core Info */}
          <div className="form-section info-main">
            <h3>Movie Details</h3>
            <div className="input-group">
              <label>Movie Name</label>
              <input type="text" name="moviename" value={formData.moviename} onChange={handleChange} placeholder="e.g. Inception" required />
            </div>

            <div className="input-group">
              <label>Summary</label>
              <textarea name="summary" value={formData.summary} onChange={handleChange} placeholder="Short description..." required />
            </div>

            <div className="grid-row">
              <div className="input-group">
                <label>Year</label>
                <input type="number" name="releaseYear" value={formData.releaseYear} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Duration (min)</label>
                <input type="number" name="duration" value={formData.duration} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Section 3: Metadata */}
          <div className="form-section info-meta">
            <h3>Additional Info</h3>
            <div className="grid-row">
              <div className="input-group">
                <label>Genre</label>
                <input type="text" name="genre" value={formData.genre} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Language</label>
                <input type="text" name="language" value={formData.language} onChange={handleChange} />
              </div>
            </div>

            <div className="grid-row">
              <div className="input-group">
                <label>Age Rating</label>
                <input type="text" name="ageRating" value={formData.ageRating} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>PG Rating</label>
                <input type="text" name="pgRating" value={formData.pgRating} onChange={handleChange} />
              </div>
            </div>

            <div className="input-group">
              <label>YouTube Link</label>
              <input type="text" name="youtubeLink" value={formData.youtubeLink} onChange={handleChange} placeholder="https://youtube.com/..." />
            </div>

            <button type="submit" className="submit-movie-btn">Publish Movie</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddMovie;