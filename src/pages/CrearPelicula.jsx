import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import postData from "../postData/postData";
//import postDataFile from "../postData/postDataFile"

const CrearPelicula = () => {
  //state para inicializar el arreglo vacio de las categorias.
  const [categorias, setCategorias] = useState([]);

  //cargar las peliculas al entrar al componente.
  useEffect(() => {
    fetch("http://localhost:3001/api/categories")
      .then((response) => response.json())
      .then((data) => setCategorias(data.categories));
  }, []);

  //metodo para crear la pelicula con los datos ingresados.
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
      postData("http://localhost:3001/api/createMovie", {
        name,
        año,
        id_categoria,
        descripcion,
      }).then((data) => {
        //si data devuelve: listo. quiere decir que recibio todo bien y puede redirigir al componente de peliculas
        if (data.message === "exitoso") {
             
          const idPelicula = "25"   //data;
          
          console.log(image,video)
          let data1 = [{
            image: image,
            video: video
          }]
         console.log(data1)
          //despues de crear la pelicula, subimos los archivos de imagen y videos

          postData(`http://localhost:3001/api/upload-image/${idPelicula}`, ({data1}))
          .then((data) => {
            console.log("datas", data);
        //si data devuelve: listo. quiere decir que recibio todo bien y puede redirigir al componente de peliculas
        if (data.message === "success") {

          //despues de crear la pelicula, subimos los archivos de imagen y videos
          
          alert("imagen y video subido con exito");
          //redirigir al componente de peliculas.
          window.location = "/peliculas";
        } else {
          alert("se creo la pelicula, pero no se pudo subir los archivos.");
          window.location = "/peliculas";
        }
      });
      //fin de subir imagen y archivo.
/* 
          alert("pelicula creada con existo");
          //redirigir al componente de peliculas.
          window.location = "/peliculas"; */
        } else {
          alert("no se pudo crear la pelicula.");
        }
      });
    }
  };

  return (
    <>
      <Header></Header>

      <div
        style={{
          padding: "70px",
          backgroundColor: "#2f353a",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form
          style={{
            padding: "30px",
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
            <input type="text" className="form-control" name="name" />
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
            <input type="number" className="form-control" name="año" />
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
            >
              <option selected value="">
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
            <input type="text" className="form-control" name="descripcion" />
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

export default CrearPelicula;
