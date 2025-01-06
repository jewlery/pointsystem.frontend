import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {store} from './store/Store';
import Spinner from './views/spinner/Spinner';
import './utils/i18n';
import {AuthProvider} from 'src/guards/jwt/JwtContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Suspense fallback={<Spinner/>}>
            <BrowserRouter>
                <AuthProvider>
                    <App/>
                </AuthProvider>
            </BrowserRouter>
        </Suspense>
    </Provider>,
);
