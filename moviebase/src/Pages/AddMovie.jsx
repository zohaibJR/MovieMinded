// moviebase/src/Pages/AddMovie.jsx

import React, { useState } from 'react';
import './Styles/AddMovie.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AddMovie = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    moviename: '',
    summary: '',
    youtubeLink: '',
    releaseYear: '',
    genre: '',
    duration: '',
    language: '',
    country: '',
    pgRating: '',
    picture: null,
  });

  const [preview, setPreview]     = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.picture) {
      alert('Please upload a movie poster.');
      return;
    }

    setSubmitting(true);
    const data = new FormData();
    for (let key in formData) {
      if (formData[key] !== null && formData[key] !== '') {
        data.append(key, formData[key]);
      }
    }

    try {
      await axios.post(`${API_BASE}/api/movies`, data);
      alert('Movie published successfully!');
      navigate('/adminhome');
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-movie-page">
      <button className="add-movie-back" onClick={() => navigate('/adminhome')}>
        ← Back to Dashboard
      </button>

      <div className="add-movie-wrapper">
        <h1 className="add-movie-title">
          Add <span>New Movie</span>
        </h1>
        <p className="add-movie-subtitle">Fill in the details below to publish a movie to the library.</p>

        <form className="add-movie-form" onSubmit={handleSubmit} encType="multipart/form-data">

          {/* Upload Column */}
          <div className="upload-col">
            <div className="upload-dropzone">
              <input
                type="file"
                name="picture"
                accept="image/*"
                onChange={handleChange}
                required
              />
              {preview ? (
                <img src={preview} alt="Poster preview" className="upload-preview" />
              ) : (
                <>
                  <div className="upload-dropzone-icon">🖼</div>
                  <p>Click to upload<br />movie poster</p>
                </>
              )}
            </div>
            {formData.picture && (
              <span className="upload-ready-tag">✓ Poster ready</span>
            )}
          </div>

          {/* Fields Column */}
          <div className="fields-col">
            <p className="fields-section-title">Core Details</p>

            <div className="field-group">
              <label>Movie Name *</label>
              <input
                type="text"
                name="moviename"
                value={formData.moviename}
                onChange={handleChange}
                placeholder="e.g. Inception"
                required
              />
            </div>

            <div className="field-group">
              <label>Summary *</label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Brief description of the movie…"
                required
              />
            </div>

            <div className="field-row">
              <div className="field-group">
                <label>Release Year</label>
                <input
                  type="number"
                  name="releaseYear"
                  value={formData.releaseYear}
                  onChange={handleChange}
                  placeholder="e.g. 2010"
                />
              </div>
              <div className="field-group">
                <label>Duration (min)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 148"
                />
              </div>
            </div>

            <p className="fields-section-title" style={{ marginTop: '8px' }}>Additional Info</p>

            <div className="field-row">
              <div className="field-group">
                <label>Genre</label>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  placeholder="e.g. Thriller"
                />
              </div>
              <div className="field-group">
                <label>Language</label>
                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  placeholder="e.g. English"
                />
              </div>
            </div>

            <div className="field-row">
              <div className="field-group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="e.g. USA"
                />
              </div>
              <div className="field-group">
                <label>PG Rating</label>
                <input
                  type="text"
                  name="pgRating"
                  value={formData.pgRating}
                  onChange={handleChange}
                  placeholder="e.g. 13"
                />
              </div>
            </div>

            <div className="field-group">
              <label>YouTube Trailer Link</label>
              <input
                type="url"
                name="youtubeLink"
                value={formData.youtubeLink}
                onChange={handleChange}
                placeholder="https://youtube.com/watch?v=…"
              />
            </div>

            <button type="submit" className="publish-btn" disabled={submitting}>
              {submitting ? 'Publishing…' : '🎬 Publish Movie'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddMovie;