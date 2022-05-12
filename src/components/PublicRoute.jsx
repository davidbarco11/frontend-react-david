import React, {} from "react";
import {Navigate,useLocation} from "react-router-dom";
//import postData from '../postData/postDataToken';

const PublicRoute = ({ children }) => {
  //obtener el token del localstorage
  //const [categorias, setCategorias] = useState([]);
  const token1 = localStorage.getItem('token');
  

    /* useEffect(() => {
      postData('http://localhost:3001/api/token', { token: token1 })
      .then(data => setCategorias(data));
    },[token1]); */
    
    let location = useLocation();
    
    if (!token1) {
      return children 
    }else{
      return <Navigate to="/peliculas" state={{ from: location }} replace />;
    }

};

export default PublicRoute;