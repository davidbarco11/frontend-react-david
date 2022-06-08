import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

const Header = () => {

  //consultar nombre de usuario.
  const nombre = JSON.parse(localStorage.getItem('usuario'))[0].name;

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

  const handleMisDatos = () =>{
    //redirigir al componente de peliculas.
    window.location = "/misDatos";
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{background: "rgba(13, 13, 13, 0.75) none repeat scroll 0% 0%",
        position: "fixed",
        zIndex: "100",
        width: "100%"}}
    >
      <div className="container-fluid">
        <Link to="/peliculas" className="navbar-brand" style={{ color: "red" }}>
        <svg
            viewBox="0 0 111 30"
            className="svg-icon svg-icon-netflix-logo"
            aria-hidden="true"
            focusable="false"
          >
            <g id="netflix-logo">
              <path
                d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"
                id="Fill-14"
              ></path>
            </g>
          </svg>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{backgroundColor: "#e5091485", boxShadow: "0px 0px 2px 3px #e3212185"}}
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
                style={{color: 'white'}}
              >
                Peliculas
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/crearPelicula" className="nav-link" style={{color: 'white'}}>
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
                style={{color: 'white'}}
              >
                Categorias
              </div>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
                style={{
                  backgroundColor: "#000000c9",
                  boxShadow: "0px 0px 14px 6px #5d14a6a8",
                  marginLeft: "-13px",
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
                <li style={{borderTop: "1px solid gray"}}>
                    <NavLink
                      to={`/crearCategoria`}
                      className="dropdown-item"
                      style={{ color: "white" }}
                    >CREAR CATEGORIA
                    </NavLink>
                  </li>
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
                  marginLeft: "-13px",
                }}
              >
                <button style={{background: "none",color: "white",border: "none",textAlign: "start",width: "100%", borderBottom: "1px solid gray", cursor: "none"}}>Hola {nombre.toUpperCase()}</button>
                <button onClick={handleMisDatos} style={{background: "none",color: "white",border: "none",textAlign: "start",width: "100%"}}>Mis datos</button>
                <button onClick={handleLogout} style={{background: "none",color: "white",border: "none",textAlign: "start",width: "100%"}}>Cerrar sesion</button>
              </ul>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
};

export default Header;
