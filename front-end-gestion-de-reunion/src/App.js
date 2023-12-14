import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import './App.css';
import Home from './Home';
import PersonneView from './component/Personne/PersonneView';
import UpdatePersonne from "./component/Personne/UpdatePersonne";
import AddPersonne from "./component/Personne/AddPersonne";
import ProfilePersonne from "./component/Personne/ProfilePersonne";
import ReunionView from "./component/Reunion/ReunionView";
import AddReunion from "./component/Reunion/AddReunion";
import UpdateReunion from "./component/Reunion/UpdateReunion";
import ProfileReunion from "./component/Reunion/ProfileReunion";
import AddPersonneToReunion from "./component/Reunion/AddPersonneToReunion";
import RemovePersonneFromReunion from "./component/Reunion/RemovePersonneFromReunion";
import AddReunionToPersonne from "./component/Personne/AddReunionToPersonne";
import RemoveReunionFromPersonne from "./component/Personne/RemoveReunionFromPersonne";
import Footer from "./component/common/Footer";
import Navbar from "./component/common/Navbar";
import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import { Component } from "react";


function App() {
  return (
    <main className="container mt-5">
        <Router>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/personnes" element={<PersonneView/>}></Route>
            <Route exact path="/addpersonne" element={<AddPersonne/>}></Route>
            <Route exact path="/updatePersonne/:id" element={<UpdatePersonne/>}></Route>
            <Route exact path="/viewPersonne/:id" element={<ProfilePersonne/>}></Route>
            <Route exact path="/reunions" element={<ReunionView/>}></Route>
            <Route exact path="/addreunion" element={<AddReunion/>}></Route>
            <Route exact path="/updateReunion/:id" element={<UpdateReunion/>}></Route>
            <Route exact path="/viewReunion/:id" element={<ProfileReunion/>}></Route>
            <Route exact path="/addPersonneToReunion/:idReunion" element={<AddPersonneToReunion/>}></Route>
            <Route exact path="/removePersonneFromReunion/:idReunion" element={<RemovePersonneFromReunion/>}></Route>
            <Route exact path="/addReunionToPersonne/:idPersonne" element={<AddReunionToPersonne/>}></Route>
            <Route exact path="/removeReunionFromPersonne/:idPersonne" element={<RemoveReunionFromPersonne/>}></Route>
          </Routes>
          <Footer/>
        </Router>
    </main>
  );
}

export default App;
