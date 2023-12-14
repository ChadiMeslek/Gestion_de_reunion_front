import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddReunion = () => {
    let navigate = useNavigate();
    const [reunion, setReunion] = useState({
        titre: '',
        dateReunion: '',
    });

    const { titre, dateReunion } = reunion;

    const handleInputChange = (e) => {
        setReunion({ ...reunion, [e.target.name]: e.target.value });
    };

    const saveReunion = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/reunions', reunion);
        navigate('/reunions');
    };

    return (
        <div className='col-sm8 py-3 px-5 border border-2 shadow' style={{ marginTop: '25px' }}>
            <h2 className='text-center'>Ajouter une Réunion</h2>
            <form onSubmit={(e) => saveReunion(e)}>
                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='titre'>
                        Titre de la Réunion :
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
                        Date de la Réunion :
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

export default AddReunion;
