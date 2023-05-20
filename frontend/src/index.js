import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme, ThemeProvider} from "@mui/material";


const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                    <App/>
            </ThemeProvider>
        </React.StrictMode>
    );

reportWebVitals();
