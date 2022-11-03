import React from 'react';
import Header from "../components/Header";

const Layout = ({ children }) => {

	//verificar si en el localstorage hay un usuario en sesion.
	let verificarLocal = JSON.parse(localStorage.getItem('usuario'));
	
	return (
		<div className="Layout" style={{backgroundColor:"#000f18",width: '100%', height: '100vh', }}>

			{/*si hay un usuario en sesiom, debe pintar el header, sino lo quita. ejemplo: cuando se ha cerrado sesion n debe aparecer el header.*/}
			{verificarLocal && <Header></Header> }
			
			{children}
		</div>
	);
}

export default Layout;
