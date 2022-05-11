import React from 'react';
import '../styles/Home.css';


const Home = () => {
	return (
		<div className="containerHome">
			<h1 className="navbar-brand" style={{ color: "red",textAlign: "center"}}>
          Netflix
        </h1>
			<div className="concord-img-wrapper" data-uia="concord-img-wrapper">
			<div className="concord-img-gradient"></div></div>
		
		</div>
	);
}

export default Home;
