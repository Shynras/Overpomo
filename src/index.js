import React from 'react';
import  { createRoot }  from 'react-dom/client';
import App from './App.js';
import './style.scss';
import 'purecss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);
