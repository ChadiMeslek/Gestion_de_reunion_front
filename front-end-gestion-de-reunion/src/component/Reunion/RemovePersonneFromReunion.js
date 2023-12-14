import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const RemovePersonneFromReunion = () => {
    const { idReunion } = useParams();
    let navigate = useNavigate();

    const [personneId, setPersonneId] = useState('');
    const [reunion, setReunion] = useState(null);
    const [personnes, setPersonnes] = useState([]);

    useEffect(() => {
        console.log('Component mounted with idReunion:', idReunion);
        loadReunion(idReunion);
        loadPersonnes();
    }, []);

    const loadReunion = async (idReunion) => {
        const result = await axios.get(`http://localhost:8080/reunions/${idReunion}`);
        setReunion(result.data);
    };

    const loadPersonnes = async () => {
        const result = await axios.get(`http://localhost:8080/reunions/${idReunion}/personnes`);
        setPersonnes(result.data);
    };

    const handlePersonneChange = (e) => {
        setPersonneId(e.target.value);
    };

    const removePersonneFromReunion = async (e) => {
        e.preventDefault();
        await axios.delete(`http://localhost:8080/reunions/${idReunion}/personnes/${personneId}`);
        navigate(`/viewReunion/${idReunion}`);
    };

    return (
        <div className='col-sm8 py-3 px-5 border border-2 shadow' style={{ marginTop: '25px' }}>
            <h2 className='text-center'>Retirer une Personne de la Réunion</h2>
            {reunion && (
                <>
                    <h4 className='text-center mb-4'>{`Titre: ${reunion.titre}`}</h4>
                    <form onSubmit={(e) => removePersonneFromReunion(e)}>
                        <div className='input-group mb-5'>
                            <label className='input-group-text' htmlFor='personneId'>
                                Personne :
                            </label>
                            <select
                                className='form-select col-sm-6'
                                name='personneId'
                                id='personneId'
                                required
                                value={personneId}  // Use value instead of selected
                                onChange={handlePersonneChange}
                            >
                                <option value='' disabled>
                                    Sélectionnez une personne
                                </option>
                                {personnes.map((personne) => (
                                    <option key={personne.id} value={personne.id}>
                                        {personne.nomPersonne} {personne.prenomPersonne}
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
                                <Link to={`/viewReunion/${idReunion}`} className='btn btn-outline-warning btn-lg'>
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

export default RemovePersonneFromReunion;
