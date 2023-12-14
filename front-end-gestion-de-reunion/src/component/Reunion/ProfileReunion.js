import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { BsEyeFill } from "react-icons/bs";
import ReunionImage from "../../Reunionimage.png";
import { FaUserPlus,FaUserMinus } from "react-icons/fa";
const ProfileReunion = () => {
    const { id } = useParams();
  
    const [reunion, setReunion] = useState({
      titre: "",
      dateReunion: "",
      personneList: [],
    });
  
    useEffect(() => {
      loadReunion();
    }, []);
  
    const loadReunion = async () => {
      const result = await axios.get(
        `http://localhost:8080/reunions/${id}`
      );
      setReunion(result.data);
    };
  
    const formatDate = (inputDate) => {
      const date = new Date(inputDate);
      return date.toLocaleDateString();
    };

    const handleDelete = async(id)=>{
        await axios.delete(`http://localhost:8080/personnes/deletePersonne/${id}`);
        loadReunion();
    }
  
    return (
      <section className="shadow" style={{ backgroundColor: "whitesmoke" }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-3">
              <div className="card mb-4">
                <div className="card-body text-center">
                  {/* You can customize the image source */}
                  <img
                    src={ReunionImage}
                    alt="reunion-image"
                    className="img-fluid"
                    style={{ width: 150 }}
                  />
                  <h5 className="my-3">{reunion.titre}</h5>
                  <div className="d-flex justify-content-center mb-2">
                    <Link to={`/updateReunion/${reunion.id}`} className="btn btn-outline-success">
                      Update
                    </Link>
                    <Link to={"/reunions"} className="btn btn-outline-warning ms-1">
                      Go Back
                    </Link>
                    <Link to={`/addPersonneToReunion/${reunion.id}`}className="btn btn-outline-info ms-1">
                        <FaUserPlus />
                    </Link>
                    <Link to={`/removePersonneFromReunion/${reunion.id}`}className="btn btn-outline-danger ms-1">
                        <FaUserMinus />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="col-lg-9">
              <div className="card mb-4">
                <div className="card-body">
                  <hr />
  
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">Titre</h5>
                    </div>
  
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{reunion.titre}</p>
                    </div>
                  </div>
  
                  <hr />
  
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">Date Réunion</h5>
                    </div>
  
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{formatDate(reunion.dateReunion)}</p>
                    </div>
                  </div>
  
                  <hr />
  
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">Personnes Associées</h5>
                    </div>
  
                    <div className="col-sm-9">
                      {reunion.personneList.length > 0 ? (
                        <table className="table table-striped  border border border-2 table-hover shadow">
                          <thead>
                            <tr className='text-center'>
                              <th>ID</th>
                              <th>Nom</th>
                              <th>Prénom</th>
                              <th>Age</th>
                              <th colSpan={3}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reunion.personneList.map((personne) => (
                              <tr key={personne.id}>
                                <td>{personne.id}</td>
                                <td>{personne.nomPersonne}</td>
                                <td>{personne.prenomPersonne}</td>
                                <td>{personne.age}</td>
                                <td className='mx-2'><Link to={`/viewPersonne/${personne.id}`} className='btn btn-info'><BsEyeFill /></Link></td>
                                <td className='mx-2'><Link to={`/updatePersonne/${personne.id}`} className='btn btn-success'><FaEdit /></Link></td>
                                <td className='mx-2'><button className='btn btn-danger' onClick={()=>handleDelete(personne.id)}><FaTrashAlt /></button></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p>Aucune personne associée</p>
                      )}
                    </div>
                  </div>
  
                  {/* Add other details similarly */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default ProfileReunion;
