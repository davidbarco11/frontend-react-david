import React, {useRef} from "react";


const MisDatos = () => {
  
  //consultar datos del usuario logueado:  
  const {name,surname,email,image} = JSON.parse(localStorage.getItem('usuario'))[0]; 

  //token del usuario logueado.
  const token1 = localStorage.getItem('token');
  
  //arreglo con datos del usuario.
  const dataUsers = {
      name: name,
      surname: surname,
      email: email,
      image: image
  }

  //consultar la foto del usuario logueado.
  let rutaFoto = "http://localhost:3001/api/avatar/";
  const fotoUser = dataUsers.image
  let foto = "";

  if(!fotoUser || fotoUser === null || fotoUser === "null") {
    foto = "https://w7.pngwing.com/pngs/1004/160/png-transparent-computer-icons-user-profile-social-web-others-blue-social-media-desktop-wallpaper.png"
  }else{
    foto = rutaFoto + fotoUser;
  }

  //metodo para actualizar los datos de usuario.
  const form = useRef(null);
  const  handleClick = async (e) => {
    e.preventDefault();

    //tomar los datos.
    const formData = new FormData(form.current);

    const name = formData.get("name");
    const apellidos = formData.get("surname");
    const email = formData.get("exampleInputEmail1");
    
    //validarlos.
    if (!name || !apellidos || !email) {
      return alert("Debes diligenciar todos los campos");
    } else {
      let headersList = {
        "Accept": "*/*",
        "token": "Thunder Client (https://www.thunderclient.com)",
        "Authorization": token1,
        "Content-Type": "application/json"
       }
      //enviar los datos al backend.
      let bodyContent = JSON.stringify({
        "name": name,
        "surname": apellidos,
        "email":email
    });
    
    let response = await fetch("http://localhost:3001/api/update", { 
      method: "PUT",
      body: bodyContent,
      headers: headersList
    });
    
    let data = await response.text();

    let dataF = JSON.parse(data);
    
    if (dataF.status === "success") {
      alert("se actualizó los datos exitosamente.");
      //actualizar el token.
      localStorage.setItem("token", dataF.token);
      //actualizar los datos del local storage del usuario.
      localStorage.setItem("usuario", JSON.stringify(dataF.userUdpate));

      //redirir al inicio de la pelicula.
      window.location = "/peliculas";
      
    } else {
      alert("no se pudo actualizar los datos exitosamente.");
    }
      
    }
  }

  


  return (
    <>
    
    <div className="container d-flex justify-content-center" style={{padding: "60px"}}>
    <form className="form-container" style={{marginTop: "40px"}} ref={form}>
        <h3 className="text-white mb-3">Datos de usuario</h3>
    <div className="imagen" style={{display: 'flex', justifyContent: 'center', width: "100%", height: "90px"}}>
    <img src={`${foto}`} alt="" style={{width: "100px", height: "100px", borderRadius: "50%",boxShadow: "1px 1px 24px 8px gray"}}/>    
    </div>    
    <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Nombres</label>
    <input type="text" className="form-control" name="name" aria-describedby="" defaultValue={dataUsers.name}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputSurname" className="form-label">Apellidos</label>
    <input type="text" className="form-control" name="surname" id="surname" aria-describedby="" defaultValue={dataUsers.surname}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
    <input type="email" className="form-control" name="exampleInputEmail1" id="exampleInputEmail1" aria-describedby="emailHelp" defaultValue={dataUsers.email}/>
  </div>
 
  <button type="submit" onClick={handleClick} className="btn btn-danger">Actualizar</button>
</form>
    </div>
   
    </>
  )
};

export default MisDatos;