import React, { useState, useEffect } from "react";
import "../styles/Peliculas.css";
import Header from "../components/Header";
import { NavLink } from "react-router-dom";

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  
  //cargar las peliculas al entrar al componente.
  useEffect(() => {
    fetch("http://localhost:3001/api/movies")
      .then((response) => response.json())
      .then((data) => setPeliculas(data.movies));
    
  }, []);


  return (
    <>
      <Header></Header>
      <div
        className="peliculas"
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", padding: "80px" }}
      >
        {peliculas.map((peliculas) => (
          <div
            key={peliculas.id}
            className="card"
            style={{
              width: "18rem",
              margin: "20px",
              boxShadow: "0px 0px 14px 3px #5d14a6a8",
            }}
          >
            <img
              src={`http://localhost:3001/api/image/${peliculas.image}`}
              
              className="card-img-top"
              alt={peliculas.name}
              style={{ width: "100%", height: "350px" }}
            />
            <div className="card-body" style={{backgroundColor: "#270d46",color: "white"}}>
              <h5 className="card-title">{peliculas.name}</h5>
              <p className="card-text">{peliculas.descripcion}</p>
              <p className="card-text">{peliculas.año}</p>
              <NavLink to={`/pelicula/${peliculas.id}`} style={{ backgroundColor: "#e50914", color: "white", textDecoration: "none" }}>
              <button
                className="btn"
                style={{ backgroundColor: "#e50914", color: "white" }}
              >

                Ver
              </button>
              </NavLink>
              
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Peliculas;
