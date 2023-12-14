import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const UpdateReunion = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [reunion, setReunion] = useState({
    titre: '',
    dateReunion: '',
    // Add other properties as needed
  });

  const { titre, dateReunion } = reunion;

  useEffect(() => {
    getReunion();
  }, []);

  const getReunion = async () => {
    const result = await axios.get(`http://localhost:8080/reunions/${id}`);
    setReunion(result.data);
  };

  const handleInputChange = (e) => {
    setReunion({ ...reunion, [e.target.name]: e.target.value });
  };

  const updateReunion = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/reunions/updateReunion/${id}`, reunion);
    navigate('/reunions');
  };

  return (
    <div className='col-sm8 py-3 px-5 border border border-2 shadow' style={{ marginTop: '25px' }}>
      <h2 className='text-center'>Modifier une Réunion</h2>
      <form onSubmit={(e) => updateReunion(e)}>
        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='titre'>
            Titre :
          </label>
          <input
            className='form-control col-sm-6'
            type='text'
            name='titre'
            id='titre'
            required
            value={titre}
            onChange={handleInputChange}
          />
        </div>
        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='dateReunion'>
            Date Réunion :
          </label>
          <input
            className='form-control col-sm-6'
            type='date'
            name='dateReunion'
            id='dateReunion'
            required
            value={dateReunion}
            onChange={handleInputChange}
          />
        </div>
        {/* Add other input fields as needed */}
        <div className='row mb-5'>
          <div className='col-sm-2'>
            <button type='submit' className='btn btn-outline-success btn-lg'>
              Save
            </button>
          </div>
          <div className='col-sm-2'>
            <Link to={'/reunions'} className='btn btn-outline-warning btn-lg'>
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateReunion;
