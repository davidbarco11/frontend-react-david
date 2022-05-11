import React from "react";
import {Link} from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{padding: "100px", backgroundColor: "#2f353a"}}>
      <div className="card" style={{boxShadow: "0px 0px 8px 9px #bb57a7"}}>
        <div className="card-header">404 - not found</div>
        <div className="card-body">
          <h5 className="card-title">Lo sentimos, al parecer te has equivocado de ruta.</h5>
          <p className="card-text">
            te recomendamos volver al inicio
          </p>
          <Link to="/peliculas" className="btn" style={{backgroundColor: "purple", color: "white"}}>
            Ver peliculas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
