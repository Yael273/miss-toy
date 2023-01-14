// import './assets/style/main.css'
import './assets/style/main.scss';

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToyIndex } from './pages/toy-index';
import { AppHeader } from "./cmps/app-header";
import { AppFooter } from "./cmps/app-footer";
import { Home } from "./pages/home";
import { ToyEdit } from './pages/toy-edit';
import { ToyDetails } from './pages/toy-details';
import { DashBoard } from './pages/dashboard-page';
import { About } from './pages/about';
import { LoginSignup } from './cmps/login-signup';
import { UserDetails } from './cmps/user-details';



export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<About />} path="/about" />
                            <Route element={<DashBoard />} path="/data" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<ToyEdit />} path="/toy/edit" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                            <Route path="/user/login" element={<LoginSignup />} />
                            <Route path="/user/details" element={<UserDetails />} />
                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
        </Provider>
    )
}

