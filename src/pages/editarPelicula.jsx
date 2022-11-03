import React, { useState, useEffect, useRef } from "react";
import putData from "../postData/putData";
import { useParams } from "react-router-dom";

//metodo pendiente por terminar. 
const EditarPelicula = () => {


  //tomo el id de la pelicula de la url.
  let { id } = useParams();

  
  //state para inicializar el arreglo vacio de las categorias.
  const [categorias, setCategorias] = useState([]);
  
  //state para inicializar el arreglo vacio de la pelicula
  const [pelicula, setPelicula] = useState([]);

  //token del usuario logueado.
  const token1 = localStorage.getItem('token');

  //cargar las categorias al entrar al componente.
  useEffect(() => {
    fetch(`http://localhost:3001/api/movie/${id}`)
      .then((response) => response.json())
      .then((data) => setPelicula(data.movie[0]));

    fetch("http://localhost:3001/api/categories")
      .then((response) => response.json())
      .then((data) => setCategorias(data.categories));
  }, [id]);

  //metodo para editar la pelicula con los datos ingresados.
  const form = useRef(null);
  const handleClick = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);

    const name = formData.get("name");
    const año = formData.get("año");
    const id_categoria = formData.get("id_categoria");
    const descripcion = formData.get("descripcion");

    const image = formData.get("image");
    const video = formData.get("video");
    

    //validar los datos.
    //return console.log(name, año, id_categoria, descripcion, image, video);
    if (!name || !año || !id_categoria || !descripcion || !image || !video) {
      return alert("Debes diligenciar todos los campos");
    } else {
      //hacer la peticion a la url del backend
      putData(`http://localhost:3001/api/updateMovie/${id}`, {
        name,
        año,
        id_categoria,
        descripcion,
        token1
      }).then((data) => {
        //si data devuelve: listo. quiere decir que recibio todo bien y puede redirigir al componente de peliculas
        if (data.status === "success") {
          
          const idPelicula = data.movieUdpate[0].id
 
          //despues de crear la pelicula, subimos los archivos de imagen y videos
          let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Authorization": token1
           }

          fetch(`http://localhost:3001/api/upload-image/${idPelicula}`, { 
          method: "POST",
          body: formData,
          headers: headersList
        }).then(response => response.json())
        .then((data) => {
            //si data devuelve: listo. quiere decir que recibio todo bien y puede redirigir al componente de peliculas
        if (data.status === "success") {

          //despues de crear la pelicula, subimos los archivos de imagen y videos
          
          alert("se actualizó la pelicula con imagen y video exitosamente.");
          //redirigir al componente de peliculas.
          window.location = "/peliculas";
        } else {
          alert("se actualizó la pelicula, pero no se pudo subir los archivos.");
          window.location = "/peliculas";
        }
        });
        
      } else {
          alert("no se pudo actualizar la pelicula.");
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
            marginTop: "40px",
            padding: "25px",
            width: "100%",
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
              Nombre
            </label>
            <input defaultValue={pelicula.name} type="text" className="form-control" name="name" />
            <div
              name="nombreHelp"
              className="form-text"
              style={{ color: "white" }}
            >
              Ingresa el nombre de la pelicula.
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="año"
              className="form-label"
              style={{ color: "white" }}
            >
              Año de lanzamiento
            </label>
            <input defaultValue={pelicula.año} type="number" className="form-control" name="año" />
            <div
              name="numberHelp"
              className="form-text"
              style={{ color: "white" }}
            >
              Ingresa solo números.
            </div>
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              aria-label="Default select example"
              name="id_categoria"
              defaultvalue={"default"}
            >
              <option disabled={true} value={"default"}>
                Selecciona un género
              </option>
              {categorias.map((categorias) => (
                <option key={categorias.id} value={categorias.id}>
                  {categorias.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label
              htmlFor="descripcion"
              className="form-label"
              style={{ color: "white" }}
            >
              Descripcion
            </label>
            <input defaultValue={pelicula.descripcion} type="text" className="form-control" name="descripcion" />
          </div>

          <div className="mb-3">
            <label
              htmlFor="imagen"
              className="form-label"
              style={{ color: "white" }}
            >
              imagen
            </label>
            <input accept="image/*" type="file" className="form-control" name="image" />
          </div>

          <div className="mb-3">
            <label
              htmlFor="video"
              className="form-label"
              style={{ color: "white" }}
            >
              video
            </label>
            <input accept="video/*" type="file" className="form-control" name="video" />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={handleClick}
              type="submit"
              className="btn btn-danger"
            >
              Editar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditarPelicula;