import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

window.is3 = {
	tacsim: process.env.NODE_ENV === "production" ? "https://api.is3tool.com:9000/tacsim" : "http://192.168.1.3:9000/tacsim"
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
