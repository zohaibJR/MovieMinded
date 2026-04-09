// moviebase/src/Pages/AddMovie.jsx

import React, { useEffect, useState } from 'react';
import './Styles/AddMovie.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const initialFormData = {
  moviename: '',
  summary: '',
  youtubeLink: '',
  ottPlatform: '',
  releaseYear: '',
  genre: '',
  duration: '',
  language: '',
  country: '',
  pgRating: '',
  picture: null,
};

const AddMovie = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState(initialFormData);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditMode) {
      setLoading(false);
      return;
    }

    const fetchMovie = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/movies/${id}`);
        const movie = res.data;

        setFormData({
          moviename: movie.moviename || '',
          summary: movie.summary || '',
          youtubeLink: movie.youtubeLink || '',
          ottPlatform: movie.ottPlatform || '',
          releaseYear: movie.releaseYear || '',
          genre: movie.genre || '',
          duration: movie.duration || '',
          language: movie.language || '',
          country: movie.country || '',
          pgRating: movie.pgRating || '',
          picture: null,
        });
        setPreview(movie.picture ? `${API_BASE}/${movie.picture}` : null);
      } catch (err) {
        console.error(err);
        alert('Unable to load this movie.');
        navigate('/adminhome');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      if (files[0]) {
        setPreview(URL.createObjectURL(files[0]));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditMode && !formData.picture) {
      alert('Please upload a movie poster.');
      return;
    }

    setSubmitting(true);
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'picture') {
        if (value) {
          data.append(key, value);
        }
        return;
      }

      data.append(key, value ?? '');
    });

    try {
      if (isEditMode) {
        await axios.put(`${API_BASE}/api/movies/${id}`, data);
        alert('Movie updated successfully!');
      } else {
        await axios.post(`${API_BASE}/api/movies`, data);
        alert('Movie published successfully!');
      }

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
        Back to Dashboard
      </button>

      <div className="add-movie-wrapper">
        <h1 className="add-movie-title">
          {isEditMode ? <>Edit <span>Movie</span></> : <>Add <span>New Movie</span></>}
        </h1>
        <p className="add-movie-subtitle">
          {isEditMode
            ? 'Update the movie details below and save your changes.'
            : 'Fill in the details below to publish a movie to the library.'}
        </p>

        {loading ? (
          <div className="add-movie-loading">Loading movie details...</div>
        ) : (
          <form className="add-movie-form" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="upload-col">
              <div className="upload-dropzone">
                <input
                  type="file"
                  name="picture"
                  accept="image/*"
                  onChange={handleChange}
                  required={!isEditMode}
                />
                {preview ? (
                  <img src={preview} alt="Poster preview" className="upload-preview" />
                ) : (
                  <>
                    <div className="upload-dropzone-icon">Poster</div>
                    <p>Click to upload<br />movie poster</p>
                  </>
                )}
              </div>

              {formData.picture ? (
                <span className="upload-ready-tag">New poster selected</span>
              ) : preview ? (
                <span className="upload-ready-tag">Current poster in use</span>
              ) : null}

              {isEditMode && (
                <p className="upload-help-text">Leave the poster blank if you want to keep the current one.</p>
              )}
            </div>

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
                  placeholder="Brief description of the movie..."
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

              <div className="field-row">
                <div className="field-group">
                  <label>YouTube Trailer Link</label>
                  <input
                    type="url"
                    name="youtubeLink"
                    value={formData.youtubeLink}
                    onChange={handleChange}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
                <div className="field-group">
                  <label>OTT Platform</label>
                  <input
                    type="text"
                    name="ottPlatform"
                    value={formData.ottPlatform}
                    onChange={handleChange}
                    placeholder="e.g. Netflix, Prime Video"
                  />
                </div>
              </div>

              <button type="submit" className="publish-btn" disabled={submitting}>
                {submitting ? (isEditMode ? 'Saving...' : 'Publishing...') : (isEditMode ? 'Save Changes' : 'Publish Movie')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddMovie;
