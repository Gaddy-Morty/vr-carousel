import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

const listingID = '32';
const url = `/legacy/gallery/${listingID}`;

ReactDOM.render(<App url={url} />, document.getElementById('gallery'));
