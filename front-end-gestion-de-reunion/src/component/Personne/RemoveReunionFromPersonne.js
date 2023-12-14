import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const RemoveReunionFromPersonne = () => {
    const { idPersonne } = useParams();
    let navigate = useNavigate();

    const [reunionId, setReunionId] = useState('');
    const [personne, setPersonne] = useState(null);
    const [reunions, setReunions] = useState([]);

    useEffect(() => {
        console.log('Component mounted with idPersonne:', idPersonne);
        loadPersonne(idPersonne);
        loadReunions();
    }, []);

    const loadPersonne = async (idPersonne) => {
        const result = await axios.get(`http://localhost:8080/personnes/${idPersonne}`);
        setPersonne(result.data);
    };

    const loadReunions = async () => {
        const result = await axios.get(`http://localhost:8080/personnes/${idPersonne}/reunions`);
        setReunions(result.data);
    };

    const handleReunionChange = (e) => {
        setReunionId(e.target.value);
    };

    const removeReunionFromPersonne = async (e) => {
        e.preventDefault();
        await axios.delete(`http://localhost:8080/reunions/${reunionId}/personnes/${idPersonne}`);
        navigate(`/viewPersonne/${idPersonne}`);
    };

    return (
        <div className='col-sm8 py-3 px-5 border border-2 shadow' style={{ marginTop: '25px' }}>
            <h2 className='text-center'>Retirer une Réunion de la Personne</h2>
            {personne && (
                <>
                    <h4 className='text-center mb-4'>{`Nom: ${personne.nomPersonne} ${personne.prenomPersonne}`}</h4>
                    <form onSubmit={(e) => removeReunionFromPersonne(e)}>
                        <div className='input-group mb-5'>
                            <label className='input-group-text' htmlFor='reunionId'>
                                Réunion :
                            </label>
                            <select
                                className='form-select col-sm-6'
                                name='reunionId'
                                id='reunionId'
                                required
                                value={reunionId}
                                onChange={handleReunionChange}
                            >
                                <option value='' disabled>
                                    Sélectionnez une réunion
                                </option>
                                {reunions.map((reunion) => (
                                    <option key={reunion.id} value={reunion.id}>
                                        {reunion.titre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='row mb-5'>
                            <div className='col-sm-2'>
                                <button type='submit' className='btn btn-outline-danger btn-lg'>
                                    Retirer
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

export default RemoveReunionFromPersonne;
