import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom"
const UpdatePersonne = () => {
    let navigate = useNavigate();
    const{id} = useParams();
    const [personne, setPersonne] = useState({
        nomPersonne: '',
        prenomPersonne: '',
        age: '',
    });

    const { nomPersonne, prenomPersonne, age } = personne;


    useEffect(() => {
        getPersonne();
    }, [])

    const getPersonne = async()=>{
        const result = await axios.get(`http://localhost:8080/personnes/${id}`);
            setPersonne(result.data)
    }


    const handleInputChange = (e) => {
        setPersonne({ ...personne, [e.target.name]: e.target.value });
    };
    const  updatePersonne = async(e) =>{
        e.preventDefault();
        await axios.put(`http://localhost:8080/personnes/updatePersonne/${id}`,personne);
        navigate("/personnes");
    }
  return (
    <div className='col-sm8 py-3 px-5 border border border-2 shadow' style={{ marginTop: '25px' }}>
        <h2 className='text-center'>Modifier une Personne</h2>
        <form onSubmit={(e)=>updatePersonne(e)}>
            <div className='input-group mb-5'>
                <label className='input-group-text' htmlFor='nomPersonne'>
                    Nom :
                </label>
                <input
                    className='form-control col-sm-6'
                    type='text'
                    name='nomPersonne'
                    id='nomPersonne'
                    required
                    value={nomPersonne}
                    onChange={handleInputChange}
                />
            </div>
            <div className='input-group mb-5'>
                <label className='input-group-text' htmlFor='prenomPersonne'>
                    Prenom :
                </label>
                <input
                    className='form-control col-sm-6'
                    type='text'
                    name='prenomPersonne'
                    id='prenomPersonne'
                    required
                    value={prenomPersonne}
                    onChange={handleInputChange}
                />
            </div>
            <div className='input-group mb-5'>
                <label className='input-group-text' htmlFor='age'>
                    Age :
                </label>
                <input
                    className='form-control col-sm-6'
                    type='number'
                    name='age'
                    id='age'
                    required
                    value={age}
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
                    <Link to={"/personnes"} className='btn btn-outline-warning btn-lg'>
                        Cancel
                    </Link>
                </div>
            </div>
        </form>
    </div>
);
}

export default UpdatePersonne