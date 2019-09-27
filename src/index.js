import React from 'react';
import ReactDOM from 'react-dom';
import {
	Provider
} from 'react-redux';


import createStore from './store';
import Routes from './Root';
import './css/less/styles.css';

const store = createStore({});
export default class App extends React.Component {
	render() {
		return (
	    <Provider store={store}>
					<div className="app">
            <div className="container vertical-center-box" style={{ marginTop: '4rem' }}>
						  <Routes />
            </div>
					</div>
	    </Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
