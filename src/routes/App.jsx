import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from '../containers/Layout';
import Login from '../containers/Login';
import Peliculas from '../pages/peliculas';
import Pelicula from '../pages/pelicula';
import EditarPelicula from '../pages/editarPelicula';
import Categoria from '../pages/categoria';
import NotFound from '../pages/NotFound';
import CrearPelicula from '../pages/CrearPelicula';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import Register from '../containers/Register';
import CrearCategoria from '../pages/CrearCategoria';
import MisDatos from '../containers/MisDatos';


const App = () => {
	return (
		<BrowserRouter>
			<Layout>
			
				<Routes>
					{/* estas dos rutas, la del home y login, solo pueden ser accedidas si no hay un token de usuario */}
					<Route exact path="/" element={<PublicRoute><Register /></PublicRoute>} />
					<Route exact path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                    <Route exact path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                    {/* estas rutas solo pueden ser accedidas si existe un usuario. */}
					<Route exact path="/peliculas" element={<PrivateRoute><Peliculas /></PrivateRoute> } />
					<Route exact path="/pelicula/:id" element={<PrivateRoute><Pelicula /></PrivateRoute>} />
					<Route exact path="/pelicula-editar/:id" element={<PrivateRoute><EditarPelicula /></PrivateRoute>} />
					<Route exact path="/categoria/:id" element={<PrivateRoute><Categoria/></PrivateRoute>} />
					<Route exact path="/crearPelicula" element={<PrivateRoute><CrearPelicula /></PrivateRoute>} />
					<Route exact path="/crearCategoria" element={<PrivateRoute><CrearCategoria /></PrivateRoute>} />
					<Route exact path="/misDatos" element={<PrivateRoute><MisDatos /></PrivateRoute>} />
					<Route path="*" element={<NotFound/>} />
				</Routes>
				
			</Layout>
			
		</BrowserRouter>
	);
}

export default App;
