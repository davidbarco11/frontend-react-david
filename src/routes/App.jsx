import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Layout from '../containers/Layout';
import Home from '../pages/Home';
import Login from '../containers/Login';
import peliculas from '../pages/peliculas';
import pelicula from '../pages/pelicula';
import categoria from '../pages/categoria';


const App = () => {
	return (
		<BrowserRouter>
			<Layout>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/peliculas" component={peliculas} />
					<Route exact path="/pelicula/:id" component={pelicula} />
					<Route exact path="/categoria/:id" component={categoria} />
					<Route path="*" />
				</Switch>
			</Layout>
			
		</BrowserRouter>
	);
}

export default App;
