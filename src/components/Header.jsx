import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  const [categorias, setCategorias] = useState([]);

  //consultar la foto del usuario logueado.
  let rutaFoto = "http://localhost:3001/api/avatar/";
  const fotoUser = JSON.parse(localStorage.getItem('usuario'))[0].image;
  let foto = "";

  if(!fotoUser || fotoUser === null || fotoUser === "null") {
    foto = "https://w7.pngwing.com/pngs/1004/160/png-transparent-computer-icons-user-profile-social-web-others-blue-social-media-desktop-wallpaper.png"
  }else{
    foto = rutaFoto + fotoUser;
  }
  
  useEffect(() => {
    fetch("http://localhost:3001/api/categories")
      .then((response) => response.json())
      .then((data) => setCategorias(data.categories));

  }, []);

  const handleLogout = () =>{
    localStorage.clear();
    //redirigir al componente de peliculas.
    window.location = "/login";
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ background: "#5d14a6a8" }}
    >
      <div className="container-fluid">
        <Link to="/peliculas" className="navbar-brand" style={{ color: "red" }}>
          Netflix
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown" style={{justifyContent: 'space-around'}}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/peliculas"
                className="nav-link active"
                aria-current="page"
              >
                Peliculas
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/crearPelicula" className="nav-link">
                Crear pelicula
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <div
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categorias
              </div>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
                style={{
                  backgroundColor: "#000000c9",
                  boxShadow: "0px 0px 14px 6px #5d14a6a8",
                }}
              >
                {categorias.map((categorias) => (
                  <li key={categorias.id}>
                    <NavLink
                      to={`/categoria/${categorias.id}`}
                      className="dropdown-item"
                      style={{ color: "white" }}
                    >
                      {categorias.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        
<ul className="navbar-nav">
            <li className="nav-item dropdown">
              <div
                className="nav-link"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
  <img style={{width: "50px",height: "50px"}} className="rounded-circle" src={`${foto}`} alt="" />
              </div>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
                style={{
                  backgroundColor: "#000000c9",
                  boxShadow: "0px 0px 14px 6px #5d14a6a8",
                }}
              >
                <button style={{background: "none",color: "white",border: "none",textAlign: "start",width: "100%", marginLeft: "10px"}}>Mis datos</button>
                <button onClick={handleLogout} style={{background: "none",color: "white",border: "none",textAlign: "start",width: "100%",marginLeft: "10px"}}>Cerrar sesion</button>
              </ul>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
};

export default Header;
