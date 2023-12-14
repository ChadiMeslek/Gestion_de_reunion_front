import React, { useEffect, useState } from "react";
import { Link , useParams } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { BsEyeFill } from "react-icons/bs";
import { LuCalendarPlus, LuCalendarMinus } from "react-icons/lu";

const ProfilePersonne = () => {
  const { id } = useParams();

  const [personne, setPersonne] = useState({
    nomPersonne: "",
    prenomPersonne: "",
    age: 0,
  });
  const [reunions, setReunions] = useState([]);

  useEffect(() => {
    loadPersonne();
    getAllReunions();
  }, []);

  const loadPersonne = async () => {
    const result = await axios.get(
      `http://localhost:8080/personnes/${id}`
    );
    setPersonne(result.data);
  };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    return date.toLocaleDateString();
};

const getAllReunions = async () => {
  const result = await axios.get("http://localhost:8080/reunions");
  setReunions(result.data);
};

const handleDelete = async(id)=>{
  await axios.delete(`http://localhost:8080/reunions/deleteReunion/${id}`);
  getAllReunions();
}
  return (
    <section className="shadow" style={{ backgroundColor: "whitesmoke" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3">
            <div className="card mb-4">
              <div className="card-body text-center">
                {/* You can customize the avatar image */}
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"  
                  className="rounded-circle img-fluid"
                  style={{ width: 150 }}
                />
                <h5 className="my-3">
                  {`${personne.nomPersonne} ${personne.prenomPersonne}`}
                </h5>
                <div className="d-flex justify-content-center mb-2">
                  <Link to={`/updatePersonne/${personne.id}`}
                   className="btn btn-outline-success">
                    Update
                  </Link>
                  <Link to ={"/personnes"}
                    className="btn btn-outline-warning ms-1"
                  >
                    Go Back
                  </Link>
                  <Link to={`/addReunionToPersonne/${personne.id}`}className="btn btn-outline-info ms-1">
                        <LuCalendarPlus />
                    </Link>
                    <Link to={`/removeReunionFromPersonne/${personne.id}`}className="btn btn-outline-danger ms-1">
                        <LuCalendarMinus />
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
                    <h5 className="mb-0">Nom</h5>
                  </div>

                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{personne.nomPersonne}</p>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Prenom</h5>
                  </div>

                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{personne.prenomPersonne}</p>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Age</h5>
                  </div>

                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{personne.age}</p>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Réunions Participées</h5>
                  </div>

                  <div className="col-sm-9">
                    {reunions.length > 0 ? (
                      <table className="table table-striped  border border border-2 table-hover shadow">
                        <thead>
                          <tr className="text-center">
                            <th>ID</th>
                            <th>Titre</th>
                            <th>Date Réunion</th>
                            <th colSpan="3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reunions.map((reunion) => {
                            if (
                              reunion.personneList &&
                              reunion.personneList.some(
                                (person) => person.id === personne.id
                              )
                            ) {
                              return (
                                <tr key={reunion.id}>
                                  <td className="">{reunion.id}</td>
                                  <td>{reunion.titre}</td>
                                  <td>{formatDate(reunion.dateReunion)}</td>
                                  <td className='mx-2'><Link to={`/viewReunion/${reunion.id}`} className='btn btn-info'><BsEyeFill /></Link></td>
                                  <td className='mx-2'><Link to={`/updateReunion/${reunion.id}`} className='btn btn-success'><FaEdit /></Link></td>
                                  <td className='mx-2'><button className='btn btn-danger' onClick={()=>handleDelete(reunion.id)}><FaTrashAlt /></button></td>
                                </tr>
                              );
                            }
                            return null;
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <p>Cette personne n'a participé à aucune réunion</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePersonne;
