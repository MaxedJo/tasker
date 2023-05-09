import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import App from './App';
import {Provider} from "react-redux";
import reportWebVitals from './reportWebVitals';
import store from "./redux";
import {createTheme, ThemeProvider} from "@mui/material";


const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <App/>
                </Provider>
            </ThemeProvider>
        </React.StrictMode>
    );

reportWebVitals(console.log);
