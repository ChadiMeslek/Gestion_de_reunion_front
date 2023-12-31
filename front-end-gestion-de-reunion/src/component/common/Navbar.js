import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to={"/"} style={{ marginLeft: '10px' }}>Gestion des Reunions</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item active">
                <Link className="nav-link" to={"/personnes"}>Personnes</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={"/addpersonne"}>Ajouter une Personne</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={"/reunions"}>Reunions</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={"/addreunion"}>Ajouter une Reunion</Link>
            </li>
            </ul>
        </div>
        </nav>
    </div>
  )
}

export default Navbar