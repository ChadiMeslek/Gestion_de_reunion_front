import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AddReunionToPersonne = () => {
    const { idPersonne } = useParams();
    let navigate = useNavigate();

    const [reunionId, setReunionId] = useState('');
    const [personne, setPersonne] = useState(null);
    const [reunions, setReunions] = useState([]);
    const [participatedReunions, setParticipatedReunions] = useState([]);

    useEffect(() => {
        console.log('Component mounted with idPersonne:', idPersonne);
        loadPersonne(idPersonne);
        loadReunions();
        loadParticipatedReunions(idPersonne);
    }, []);

    const loadPersonne = async (idPersonne) => {
        const result = await axios.get(`http://localhost:8080/personnes/${idPersonne}`);
        setPersonne(result.data);
    };

    const loadReunions = async () => {
        const result = await axios.get('http://localhost:8080/reunions');
        setReunions(result.data);
    };

    const loadParticipatedReunions = async (idPersonne) => {
        const result = await axios.get(`http://localhost:8080/personnes/${idPersonne}/reunions`);
        setParticipatedReunions(result.data);
    };

    const handleReunionChange = (e) => {
        setReunionId(e.target.value);
    };

    const addReunionToPersonne = async (e) => {
        e.preventDefault();

        await axios.put(`http://localhost:8080/reunions/${reunionId}/personnes/${idPersonne}`);
        navigate(`/viewPersonne/${idPersonne}`);
    };

    // Filter out the participated reunions from the available reunions
    const availableReunions = reunions.filter(
        (reunion) => !participatedReunions.some((participatedReunion) => participatedReunion.id === reunion.id)
    );

    return (
        <div className='col-sm8 py-3 px-5 border border-2 shadow' style={{ marginTop: '25px' }}>
            <h2 className='text-center'>Ajouter une Réunion à la Personne</h2>
            {personne && (
                <>
                    <h4 className='text-center mb-4'>{`Nom: ${personne.nomPersonne} ${personne.prenomPersonne}`}</h4>
                    <form onSubmit={(e) => addReunionToPersonne(e)}>
                        <div className='input-group mb-5'>
                            <label className='input-group-text' htmlFor='reunionId'>
                                Réunion :
                            </label>
                            <select
                                className='form-select col-sm-6'
                                name='reunionId'
                                id='reunionId'
                                required
                                onChange={handleReunionChange}
                            >
                                <option value='' disabled selected>
                                    Sélectionnez une réunion
                                </option>
                                {availableReunions.map((reunion) => (
                                    <option key={reunion.id} value={reunion.id}>
                                        {reunion.titre} - {reunion.dateReunion}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='row mb-5'>
                            <div className='col-sm-2'>
                                <button type='submit' className='btn btn-outline-success btn-lg'>
                                    Ajouter
                                </button>
                            </div>
                            <div className='col-sm-2'>
                                <Link to={`/viewPersonne/${idPersonne}`} className='btn btn-outline-warning btn-lg'>
                                    Annuler
                                </Link>
                            </div>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default AddReunionToPersonne;
