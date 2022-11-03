import React, {useRef} from 'react';
import postData from "../postData/postData";

const CrearCategoria = () => {

  //token del usuario logueado.
  const token1 = localStorage.getItem('token');
    
  
    //metodo para crear la pelicula con los datos ingresados.
    const form = useRef(null);
    const handleClick = (e) => {
      e.preventDefault();
  
      const formData = new FormData(form.current);
  
      const name = formData.get("name");
     
      //validar los datos.
      if (!name) {
        return alert("Debes diligenciar todos los campos");
      } else {
        //hacer la peticion a la url del backend
        postData("http://localhost:3001/api/createCategory", {name,token1})
        .then((data) => {
            if(data.status === "success") {
                alert("categoria guardada correctamente");
                //redirigir al componente de peliculas.
                window.location = "/peliculas";

            }else{
                alert("hubo un error al guardar, intenta de nuevo.")
            }
          
        });
      }
    };
  
    return (
      <>
        <div
        style={{
          padding: "80px",
          backgroundColor: "#000f18",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form
          style={{
            marginTop: "80px",
            padding: "20px",
            width: "80%",
            height: "100%",
            boxShadow: "0px 0px 18px 5px purple",
            borderRadius: "13px",
          }}
          ref={form}
        >
          <div className="mb-3">
            <label
              htmlFor="nombre"
              className="form-label"
              style={{ color: "white" }}
            >
              Nueva categoria
            </label>
            <input type="text" className="form-control" name="name" />
            <div
              name="nombreHelp"
              className="form-text"
              style={{ color: "white" }}
            >
              
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={handleClick}
              type="submit"
              className="btn btn-primary"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
  
      </>
    );
  };
  
  export default CrearCategoria;