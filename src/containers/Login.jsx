import React, { useRef } from 'react';
import postData from '../postData/postData'
import '../styles/Login.css';

const Login = () => {
    
	const form = useRef(null);
    const handleClick = (e) => {
		e.preventDefault();
		const formData = new FormData(form.current);
		
		const email = formData.get('email');
			const password = formData.get('password');
			const getToken = true
		
        //console.log(data);
        
		//hacer la peticion a la url del backend

  postData('http://localhost:3001/api/login', { email, password, getToken})
  .then(data => {

	//si data devuelve: listo. quiere decir que recibio todo bien y puede redirigir al componente de peliculas
    if(data.message === "listo"){
		//guardar el token en el local storage.
		localStorage.setItem('token', JSON.stringify(data.token));

		//redirigir al componente de peliculas.
		window.location = '/peliculas';

        
	}else{
		alert("no coinciden las credenciales.")
	}
    
  });
		
	}

	return (
		<div className="login">
			<div className="form-container">
				<img src="./logos/logo_yard_sale.svg" alt="logo" className="logo" />
				<h1 className="title">Login</h1>
				<p className="subtitle">ingresa tu email y contraseña</p>
				<form action="/" className="form" ref={form}>
					<label htmlFor="email" className="label">Email</label>
					<input type="email" name="email" placeholder="email@email.com" className="input input-password" />
					<label htmlFor="password" className="label">Password</label>
					<input type="password" name="password" placeholder="*********" className="input input-password" />
					<input type="submit" value="Ingresar" className="primary-button login-button" onClick={handleClick}/>
				</form>
			</div>
		</div>
	);
}

export default Login;
