import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

const Pelicula = () => {
  const [pelicula, setPelicula] = useState([]);

  //tomo el id de la pelicula de la url.
  let { id } = useParams();

  //cargar las peliculas al entrar al componente metodo get.
  useEffect(() => {
    fetch(`http://localhost:3001/api/movie/${id}`)
      .then((response) => response.json())
      .then((data) => setPelicula(data.movie));
  }, [id]);
  //console.log(pelicula);
  return (
    <>
      <Header></Header>
      <div
        className="peliculas"
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", padding: "80px"  }}
      >
        {pelicula.map((pelicula) => (
          <div
            key={pelicula.id}
            className="card"
            style={{
              width: "66%",
              margin: "30px",
              boxShadow: "0px 0px 14px 3px #5d14a6a8",
            }}
          >
            <video width="100%" height="100%" controls poster={`http://localhost:3001/api/image/${pelicula.image}`}>
              <source
                src={`http://localhost:3001/api/video/${pelicula.video}`}
              />
            </video>

            <div
              className="card-body"
              style={{ backgroundColor: "#270d46", color: "white" }}
            >
              <h5 className="card-title">{pelicula.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Pelicula;
