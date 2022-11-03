import React, { useState, useEffect } from "react";
import { NavLink} from "react-router-dom";
import { useParams } from "react-router-dom";


const Categoria = () => {
  const [categoria, setCategoria] = useState([]);

  //tomo el id de la pelicula de la url.
  let { id } = useParams();
  
  //cargar las peliculas al entrar al componente.
  useEffect(() => {
    fetch(`http://localhost:3001/api/movie-category/${id}`)
    .then((response) => response.json())
    .then((data) => {
       if(data.status === "ok"){
         setCategoria(data.movie)
       }else{
        alert("No hay peliculas para esta categoria");
        //redirigir al componente de peliculas.
        window.location = "/peliculas";
       }


    });

  }, [id]);

  //console.log(categoria);

  return (
    <>
      <div
        className="peliculas"
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", padding: "80px" }}
      >
        {categoria.map((categoria) => (
          <div
            key={categoria.id}
            className="card"
            style={{
              width: "18rem",
              margin: "20px",
              boxShadow: "0px 0px 14px 3px #5d14a6a8",
            }}
          >
            <img
              src={`http://localhost:3001/api/image/${categoria.image}`}
              
              className="card-img-top"
              alt={categoria.name}
              style={{ width: "100%", height: "350px" }}
            />
            <div className="card-body" style={{backgroundColor: "#270d46",color: "white"}}>
              <h5 className="card-title">{categoria.nombre}</h5>
              <h6 className="card-title">{categoria.nombre_categoria}</h6>
              <p className="card-text">{categoria.descripcion}</p>
              <p className="card-text">{categoria.año}</p>
              <NavLink to={`/pelicula/${categoria.id}`} style={{ backgroundColor: "#e50914", color: "white", textDecoration: "none" }}>
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

export default Categoria;