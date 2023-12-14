import React, { useEffect, useState } from 'react';
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom"
const PersonneView = () => {
    const[personnes,setPersonnes] = useState([]);
    const [reunions, setReunions] = useState([]);
    
    useEffect(() => {
        getAllPersonnes();
        getAllReunions();
    }, [])

    const getAllPersonnes = async()=>{
        const result = await axios.get("http://localhost:8080/personnes");
            setPersonnes(result.data)
    }
    const getAllReunions = async () => {
        const result = await axios.get("http://localhost:8080/reunions");
        setReunions(result.data);
    };

    const handleDelete = async(id)=>{
        await axios.delete(`http://localhost:8080/personnes/deletePersonne/${id}`);
        getAllPersonnes();
    }

    const countParticipatedReunions = (personne) => {
        let count = 0;
        reunions.forEach((reunion) => {
            if (reunion.personneList.some((p) => p.id === personne.id)) {
                count++;
            }
        });
        return count;
    };


  return (
    <section style={{ marginTop: '25px' }}>
        <h2 className='text-center'>Liste des Personnes</h2>
        <table className='table table-striped  border border border-2 table-hover shadow '>
            <thead>
                <tr className='text-center'>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Age</th>
                    <th>Nombre de Réunions Participés</th>
                    <th colSpan="3">Actions</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {personnes.map((personne)=>(
                <tr key={personne.id}>
                    <th scope="row">{personne.id}</th>
                    <td>{personne.nomPersonne}</td>
                    <td>{personne.prenomPersonne}</td>
                    <td>{personne.age}</td>
                    <td>{countParticipatedReunions(personne)}</td>
                    <td className='mx-2'><Link to={`/viewPersonne/${personne.id}`} className='btn btn-info'><BsEyeFill /></Link></td>
                    <td className='mx-2'><Link to={`/updatePersonne/${personne.id}`} className='btn btn-success'><FaEdit /></Link></td>
                    <td className='mx-2'><button className='btn btn-danger' onClick={()=>handleDelete(personne.id)}><FaTrashAlt /></button></td>
                </tr>
                ))}
            </tbody>
        </table>
    </section>
  )
}

export default PersonneView