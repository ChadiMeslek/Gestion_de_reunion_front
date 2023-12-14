import React from 'react';
import { BsPersonFill, BsCalendarCheck } from 'react-icons/bs';
import {Link} from 'react-router-dom';
const Home = () => {
  return (
    <div className="container my-5">
      <div className="card">
        <div className="card-header bg-dark text-white">
          <h2 className="card-title text-center">Welcome to Gestion des Réunions</h2>
        </div>
        <div className="card-body">
          <p className="card-text text-center">
            <strong>Les technologies utilisées pour développer cette application sont : ReactJs, SpringBoot, BootStrap, MySQL et Postman.</strong>
          </p>
        </div>
      </div>

      {/* First Additional Card */}
      <Link to={"/personnes"}>
      <div className="card mt-4">
        <div className="card-header bg-primary text-white">
          <h5 className="card-title text-center">Personnes</h5>
        </div>
        <div className="card-body text-center">
          <i className="bi bi-person-fill fs-1 text-primary"></i>
          <BsPersonFill className="fs-1 text-primary" />
          <p className="card-text mt-3">Accéder à la liste des Personnes</p>
        </div>
      </div>
      </Link>

      {/* Second Additional Card */}
      <Link to={"/reunions"}>
      <div className="card mt-4">
        <div className="card-header bg-success text-white">
          <h5 className="card-title text-center">Réunions</h5>
        </div>
        <div className="card-body text-center">
          <i className="bi bi-calendar-check fs-1 text-success"></i>
          <BsCalendarCheck className="fs-1 text-success" />
          <p className="card-text mt-3">Accéder à la liste des Réunions</p>
        </div>
      </div> 
      </Link> 
    </div>
  );
};

export default Home;
