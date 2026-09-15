import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles.css';
import App from './App.jsx';
import Admin from './Admin.jsx';

// `?admin` funciona también bajo el subdirectorio usado por GitHub Pages.
const Root = window.location.pathname.startsWith('/admin') || new URLSearchParams(window.location.search).has('admin') ? Admin : App;
createRoot(document.getElementById('root')).render(<React.StrictMode><Root /></React.StrictMode>);
