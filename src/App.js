import React from 'react';
import InputSearch from './components/input-search';
import UserList from './components/user-list';
import UserDetail from './components/user-detail';
import ProjectDetail from './components/project-detail';
import { store } from './services/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="wrapper">
					<div className="container">
						<div className="wrap-box">
							<Switch>
								<Route exact path="/">
									<InputSearch/>
									<UserList />
								</Route>
								<Route path="/detail/:user/:project">
									<ProjectDetail />
								</Route>
								<Route path="/detail/:user">
									<UserDetail />
								</Route>
								<Route path="*">
									<h4>Page not found</h4>
									<Link to="/">Back</Link>
								</Route>
							</Switch>
						</div>
					</div>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
