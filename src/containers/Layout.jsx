import React from 'react';

const Layout = ({ children }) => {
	return (
		<div className="Layout" style={{backgroundColor:"#000f18",width: '100%', height: '100vh', }}>
			{children}
		</div>
	);
}

export default Layout;
