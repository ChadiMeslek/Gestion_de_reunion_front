import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
const ReunionView = () => {
    const[reunions,setReunions] = useState([]);
    const [associatedPersonnes, setAssociatedPersonnes] = useState([]);

    useEffect(() => {
        getAllReunions();
    }, [])

    const getAllReunions = async()=>{
        const result = await axios.get("http://localhost:8080/reunions");
            setReunions(result.data)
    }

    const handleDelete = async(id)=>{
        await axios.delete(`http://localhost:8080/reunions/deleteReunion/${id}`);
        getAllReunions();
    }

    const fetchReunionDetails = async (id) => {
        const response = await axios.get(`http://localhost:8080/reunions/${id}`);
        setAssociatedPersonnes(response.data.personneList);
      };

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        return date.toLocaleDateString();
      };

  return (
    <section style={{ marginTop: '25px' }}>
        <h2 className='text-center'>Liste des Reunions</h2>
        <table className='table table-striped  border border border-2 table-hover shadow'>
            <thead>
                <tr className='text-center'>
                    <th>Id</th>
                    <th>Titre du Reunion</th>
                    <th>Date Reunion</th>
                    <th>Nombre de Personnes Associés</th>
                    <th colSpan="3">Actions</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {reunions.map((reunion) => (
                <tr key ={reunion.id}>
                <th scope="row">{reunion.id}</th> 
                <td>{reunion.titre}</td>
                <td>{formatDate(reunion.dateReunion)}</td>
                <td>
                    {reunion.personneList.length > 0 ? (reunion.personneList.length) : ("Aucune personne n'est associé à cette réunion ")}
                </td>
                <td className='mx-2'><Link to={`/viewReunion/${reunion.id}`} className='btn btn-info'><BsEyeFill /></Link></td>
                <td className='mx-2'><Link to={`/updateReunion/${reunion.id}`} className='btn btn-success'><FaEdit /></Link></td>
                <td className='mx-2'><button className='btn btn-danger' onClick={()=>handleDelete(reunion.id)}><FaTrashAlt /></button></td>
                </tr>
                ))}


            </tbody>
        </table>
    </section>
  )
}

export default ReunionView