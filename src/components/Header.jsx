import React, {useState,useEffect} from "react";
import { NavLink,Link } from "react-router-dom";

const Header = () => {

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/categories')
  .then(response => response.json())
  .then(data => setCategorias(data.categories))

  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{background: "#5d14a6a8"}}>
  <div className="container-fluid">
    <Link to="/" className="navbar-brand" style={{color: "red"}}>Netflix</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link active" aria-current="page">Peliculas</Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link">Crear pelicula</Link>
        </li>
      </ul>

      <ul className="navbar-nav">
       
        <li className="nav-item dropdown">
          <div className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categorias
          </div>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style={{backgroundColor: '#000000c9',boxShadow: "0px 0px 14px 6px #5d14a6a8"}}>
             
          {categorias.map((categorias) => (

          <li key={categorias.id}><NavLink to={`/categoria/${categorias.id}`} className="dropdown-item" style={{color: 'white'}}>{categorias.name}</NavLink></li>

            ))}

          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
};

export default Header;