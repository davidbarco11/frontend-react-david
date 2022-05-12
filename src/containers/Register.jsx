import React, { useRef } from "react";
import postData from "../postData/postData";
import {Link} from 'react-router-dom';

//estilos css
import "../styles/Register.css";

//iconos fontawesome.
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'


const Register = () => {
  //para tomar los valores de cada input.
  const form = useRef(null);

  //metodo para guardar el usuario nuevo.
  const handleClick = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);

    const name = formData.get("name");
    const surname = formData.get("surname");
    const email = formData.get("email");
    const password = formData.get("password");

    //return console.log(name, surname, email, password);
    if (!name || !surname || !email || !password) {
      return alert("Debes diligenciar todos los campos");
    } else {
      //hacer la peticion a la url del backend
      postData("http://localhost:3001/api/register", {
        name,
        surname,   
        email,
        password
      }).then((data) => {

        
        //si data devuelve: listo. quiere decir que recibio todo bien y puede redirigir al componente de peliculas
        if (data.status === "success") {
          
          alert("Registro exitoso.");  
          //redirigir al componente de login.
          window.location = "/login";
        } else if(data.status === "email existe") {
          alert("el email ya se encuentra registrado.");
        }else if(data.status === "datos invalidos"){
            alert("datos invalidos, revisa que los campos sean diligenciados correctamente");
        }else{
            alert("error en registro, intenta nuevamente.");
        }
      });
    }
  };

  return (
    <div className="register">
      <form className="form-container" ref={form}>
        <div className="mb-3">
          <label for="exampleInputNombres" className="form-label">
            Nombres
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            aria-describedby="emailHelp"
          />
          <label for="exampleInputApellidos" className="form-label">
            Apellidos
          </label>
          <input
            type="text"
            className="form-control"
            name="surname"
            aria-describedby="emailHelp"
          />
          <label for="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="email@email.com"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" name="password" />
        </div>
        <button onClick={handleClick} type="submit" className="btn btn-primary">
          Registrarse
        </button>
        <div style={{display: 'flex',justifyContent: 'center',marginTop:"15px"}}>
            <button className="btn btn-secondary">
              <Link style={{ color: "white",textDecoration:"none"}} to="/login">
                Iniciar sesión
                <FontAwesomeIcon icon={faArrowRightFromBracket} style={{marginLeft: "10px"}}/>
              </Link>
            </button>
          </div>
      </form>
    </div>
  );
};

export default Register;
