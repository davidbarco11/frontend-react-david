import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from '../containers/Layout';
import Home from '../pages/Home';
import Login from '../containers/Login';
import Peliculas from '../pages/peliculas';
import Pelicula from '../pages/pelicula';
import Categoria from '../pages/categoria';
import NotFound from '../pages/NotFound';
import CrearPelicula from '../pages/CrearPelicula';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import Register from '../containers/Register'



const App = () => {
	return (
		<BrowserRouter>
			<Layout>
				
				<Routes>
					{/* estas dos rutas, la del home y login, solo pueden ser accedidas si no hay un token de usuario */}
					<Route exact path="/" element={<PublicRoute><Home /></PublicRoute>} />
					<Route exact path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                    <Route exact path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                    {/* estas rutas solo pueden ser accedidas si existe un usuario. */}
					<Route exact path="/peliculas" element={<PrivateRoute><Peliculas /></PrivateRoute> } />
					<Route exact path="/pelicula/:id" element={<PrivateRoute><Pelicula /></PrivateRoute>} />
					<Route exact path="/categoria/:id" element={<PrivateRoute><Categoria/></PrivateRoute>} />
					<Route exact path="/crearPelicula" element={<PrivateRoute><CrearPelicula /></PrivateRoute>} />
					<Route path="*" element={<NotFound/>} />
				</Routes>
				
			</Layout>
			
		</BrowserRouter>
	);
}

export default App;
